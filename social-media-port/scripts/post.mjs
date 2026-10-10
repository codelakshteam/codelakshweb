// Publishes due items from queue.json to Instagram (and optionally a Facebook Page).
// Node 18+, no dependencies. Usage: node scripts/post.mjs [--dry-run] [--id <post-id>]
// Queue item media: image_url | image_urls[] (carousel, 2-10) | video_url (+ reel). Optional alt_text / alt_texts[].
import { readFileSync, writeFileSync } from "node:fs";

const QUEUE = process.env.QUEUE_FILE ? new URL(`file://${process.env.QUEUE_FILE}`) : new URL("../queue.json", import.meta.url);
const CONFIG = new URL("../config.json", import.meta.url);
const IG_GRAPH = process.env.IG_GRAPH_BASE ?? "https://graph.instagram.com/v21.0"; // override is for tests only
const FB_GRAPH = "https://graph.facebook.com/v21.0";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const onlyId = args.includes("--id") ? args[args.indexOf("--id") + 1] : null;
const config = JSON.parse(readFileSync(CONFIG, "utf8"));

const env = (k, required = true) => {
  const v = process.env[k];
  if (!v && required) throw new Error(`Missing env var ${k}`);
  return v;
};

// Error text must never contain the token: Graph echoes URLs/params in some errors.
const scrub = (s) => String(s).replace(/access_token=[^&"\s]+/g, "access_token=***");

async function call(url, params, method = "POST", retries = 2) {
  const body = new URLSearchParams(params);
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(method === "GET" ? `${url}?${body}` : url, {
        method,
        body: method === "GET" ? undefined : body,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.error) {
        const transient = res.status >= 500 || json.error?.is_transient === true;
        const err = new Error(`${method} ${url} -> ${res.status} ${JSON.stringify(json.error ?? json)}`);
        err.transient = transient;
        throw err;
      }
      return json;
    } catch (e) {
      // Only GETs (and clearly transient errors on container creation) are retried; media_publish never is.
      const retryable = (method === "GET" || e.transient) && !url.includes("media_publish");
      if (!retryable || attempt >= retries) throw new Error(scrub(e.message));
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
    }
  }
}

async function waitForContainer(id, token) {
  for (let i = 0; i < 30; i++) {
    const s = await call(`${IG_GRAPH}/${id}`, { fields: "status_code", access_token: token }, "GET");
    if (s.status_code === "FINISHED") return;
    if (s.status_code === "ERROR" || s.status_code === "EXPIRED") {
      throw new Error(`Instagram media container ${id} ended in ${s.status_code}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`Instagram media container ${id} not ready in time`);
}

const mediaUrls = (p) => (p.image_urls?.length ? p.image_urls : p.image_url ? [p.image_url] : []);
const altOf = (p, i) => (p.alt_texts?.[i] ?? (i === 0 ? p.alt_text : undefined));

async function checkMedia(post) {
  const urls = [...mediaUrls(post), ...(post.video_url ? [post.video_url] : [])];
  if (!urls.length) return "no image_url / image_urls / video_url";
  for (const u of urls) {
    try {
      const r = await fetch(u, { method: "HEAD", redirect: "follow" });
      if (!r.ok) return `${u} -> HTTP ${r.status}`;
    } catch (e) {
      return `${u} -> ${e.message}`;
    }
  }
  return null;
}

async function checkToken() {
  const token = env("IG_ACCESS_TOKEN");
  try {
    const me = await call(`${IG_GRAPH}/me`, { fields: "username,account_type", access_token: token }, "GET");
    console.log(`Instagram token OK (@${me.username}).`);
  } catch (e) {
    throw new Error(`Instagram token check failed. Renew it (README: Token renewal). ${e.message}`);
  }
  const age = Math.floor((Date.now() - new Date(config.token_issued).getTime()) / 864e5);
  const left = config.token_lifetime_days - age;
  if (age >= config.token_warn_after_days) {
    console.log(`::warning title=Instagram token expires soon::Token is ~${age} days old (about ${left} days left). Renew it and update token_issued in config.json.`);
  }
}

async function postInstagram(post) {
  const token = env("IG_ACCESS_TOKEN");
  const userId = env("IG_USER_ID");
  const caption = post.caption ?? "";
  const urls = mediaUrls(post);
  let creationId;
  if (post.video_url) {
    const c = await call(`${IG_GRAPH}/${userId}/media`, {
      caption, access_token: token, media_type: post.reel ? "REELS" : "VIDEO", video_url: post.video_url,
    });
    creationId = c.id;
  } else if (urls.length > 1) {
    const kids = [];
    for (let i = 0; i < urls.length; i++) {
      const p = { image_url: urls[i], is_carousel_item: "true", access_token: token };
      if (altOf(post, i)) p.alt_text = altOf(post, i);
      const k = await call(`${IG_GRAPH}/${userId}/media`, p);
      kids.push(k.id);
    }
    for (const k of kids) await waitForContainer(k, token);
    creationId = (await call(`${IG_GRAPH}/${userId}/media`, {
      media_type: "CAROUSEL", children: kids.join(","), caption, access_token: token,
    })).id;
  } else {
    const p = { caption, image_url: urls[0], access_token: token };
    if (altOf(post, 0)) p.alt_text = altOf(post, 0);
    creationId = (await call(`${IG_GRAPH}/${userId}/media`, p)).id;
  }
  await waitForContainer(creationId, token);
  const published = await call(`${IG_GRAPH}/${userId}/media_publish`, { creation_id: creationId, access_token: token });
  return published.id;
}

async function postFacebook(post) {
  const pageId = env("FB_PAGE_ID");
  const token = env("FB_PAGE_TOKEN");
  const first = mediaUrls(post)[0];
  const res = first
    ? await call(`${FB_GRAPH}/${pageId}/photos`, { url: first, caption: post.caption ?? "", access_token: token })
    : await call(`${FB_GRAPH}/${pageId}/feed`, { message: post.caption ?? "", access_token: token });
  return res.post_id ?? res.id;
}

const handlers = { instagram: postInstagram, facebook: postFacebook };

const queue = JSON.parse(readFileSync(QUEUE, "utf8"));
const save = () => writeFileSync(QUEUE, JSON.stringify(queue, null, 2) + "\n");
const now = new Date();
const due = queue
  .filter((p) => p.status === "pending" && (onlyId ? p.id === onlyId : !p.scheduled_at || new Date(p.scheduled_at) <= now))
  .sort((a, b) => new Date(a.scheduled_at ?? 0) - new Date(b.scheduled_at ?? 0));

if (!due.length) {
  console.log("Nothing due.");
  if (!dryRun && process.env.IG_ACCESS_TOKEN) await checkToken().catch((e) => { console.error(e.message); process.exitCode = 1; });
  process.exit(process.exitCode ?? 0);
}

if (!dryRun) await checkToken(); // fails the run (GitHub emails you) before anything is posted

// A small per-run cap keeps us far below Instagram's ~50 API posts / 24h limit.
const batch = onlyId ? due.slice(0, 1) : due.slice(0, config.posts_per_run ?? 1);
let anyFailed = false;
for (const post of batch) {
  console.log(`${dryRun ? "[dry-run] " : ""}Posting ${post.id} to ${post.platforms.join(", ")}`);
  const mediaProblem = await checkMedia(post);
  if (mediaProblem) {
    // Leave it pending: it retries on the next run once the media is online.
    console.error(`  SKIPPED ${post.id}: media not reachable (${mediaProblem})`);
    anyFailed = true;
    continue;
  }
  if (dryRun) continue;
  post.results = post.results ?? {};
  let failed = false;
  for (const platform of post.platforms) {
    if (post.results[platform]?.id) continue; // already published on a previous partial run
    const handler = handlers[platform];
    if (!handler) {
      post.results[platform] = { error: `unknown platform ${platform}` };
      failed = true;
      continue;
    }
    try {
      post.results[platform] = { id: await handler(post), at: new Date().toISOString() };
      console.log(`  ${platform}: published ${post.results[platform].id}`);
    } catch (e) {
      post.results[platform] = { error: scrub(e.message ?? e) };
      failed = true;
      console.error(`  ${platform}: FAILED ${post.results[platform].error}`);
    }
    save(); // persist after every platform so a crash can never cause a double post
  }
  post.status = failed ? "failed" : "posted";
  anyFailed ||= failed;
  save();
}
process.exit(anyFailed ? 1 : 0);
