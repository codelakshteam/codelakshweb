#!/usr/bin/env node
// Usage: node marketing/instagram/src/publish.mjs [--live] [--post <id>] [--now <ISO>] [--check-links]
// Default is a DRY RUN: validates everything and prints what would be published. --live is required to post.
import { args, cfg, paths, loadPosts, igEnv } from './common.mjs';
import { createClient } from './graph.mjs';
import { Ledger } from './ledger.mjs';
import { validatePost, checkUrls, mediaUrl, withUtm } from './validate.mjs';
import { publishPost } from './publisher.mjs';
import { writeDailySummary } from './report.mjs';

const a = args();
const live = a.live === true && process.env.IG_PUBLISH_ENABLED === 'true';
if (a.live === true && !live) console.log('--live given but IG_PUBLISH_ENABLED != "true": staying in dry-run (safety switch).');
const now = a.now ? new Date(a.now) : new Date();
const ledger = new Ledger(paths.ledger);
let posts = loadPosts();
if (a.post) posts = posts.filter((p) => p.id === a.post);

const results = [];
let blocked = 0;
for (const post of posts) {
  const v = validatePost(post, cfg, { publicDir: paths.publicDir });
  v.warnings.forEach((w) => console.log(`warn  ${post.id}: ${w}`));
  if (v.errors.length) { blocked++; v.errors.forEach((e) => console.log(`ERROR ${post.id}: ${e}`)); results.push({ id: post.id, status: 'invalid', errors: v.errors }); continue; }
  if (ledger.get(post.id)?.state === 'published') continue;
  if (post.status !== 'approved') { console.log(`skip  ${post.id}: status=${post.status} (set "approved" to allow publishing)`); continue; }
  if (new Date(post.scheduled_at) > now && !a.post) { console.log(`wait  ${post.id}: scheduled ${post.scheduled_at}`); continue; }

  if (a['check-links'] || live) {
    const urls = [...(post.format === 'reel' ? [] : post.media.map((m) => mediaUrl(m, cfg))), ...(post.link ? [withUtm(post.link, post)] : [])];
    const bad = await checkUrls(urls);
    if (bad.length) { blocked++; bad.forEach((b) => console.log(`ERROR ${post.id}: URL not reachable: ${b}`)); results.push({ id: post.id, status: 'invalid', errors: bad }); continue; }
  }
  if (!live) { console.log(`DRY   ${post.id}: would publish ${post.format} (${post.media.length} media)`); results.push({ id: post.id, status: 'dry-run' }); continue; }

  const env = igEnv();
  if (!env.igUserId || !env.token) { console.error('IG_USER_ID / IG_ACCESS_TOKEN not set. See README setup.'); process.exit(2); }
  const client = createClient({ host: env.host, version: env.version, token: env.token });
  const r = await publishPost(post, cfg, { client, ledger, igUserId: env.igUserId });
  console.log(`${r.status.toUpperCase()} ${post.id}${r.permalink ? ' ' + r.permalink : ''}${r.guidance ? '\n  -> ' + r.guidance : ''}`);
  results.push({ id: post.id, ...r });
}
writeDailySummary({ ledger, posts: loadPosts(), results, now, live });
if (results.some((r) => r.status === 'failed') || blocked) process.exit(1);
