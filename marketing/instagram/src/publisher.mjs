// Idempotent publish flow: container(s) -> poll -> media_publish -> permalink.
// Safety rule: a post is only ever marked "published" when Instagram returns a media id.
import { buildCaption, mediaUrl } from './validate.mjs';

const sleepDefault = (ms) => new Promise((r) => setTimeout(r, ms));

export async function recentMedia(client, igUserId) {
  const r = await client.get(`${igUserId}/media`, { fields: 'id,caption,permalink,timestamp', limit: 25 });
  return r.data || [];
}

async function reconcile(client, igUserId, caption) {
  const hit = (await recentMedia(client, igUserId)).find((m) => (m.caption || '').trim() === caption.trim());
  return hit || null;
}

async function waitFinished(client, id, { sleep, pollMs, pollMax }) {
  for (let i = 0; i < pollMax; i++) {
    const r = await client.get(id, { fields: 'status_code,status' });
    if (r.status_code === 'FINISHED') return;
    if (r.status_code === 'ERROR' || r.status_code === 'EXPIRED') throw Object.assign(new Error(`container ${r.status_code}: ${r.status || ''}`), { containerDead: true });
    await sleep(pollMs);
  }
  throw new Error('container not FINISHED before timeout');
}

export async function publishPost(post, cfg, { client, ledger, igUserId, log = console.log, sleep = sleepDefault, pollMs = 5000, pollMax = 36 }) {
  const caption = buildCaption(post, cfg);
  let entry = ledger.get(post.id) || {};
  if (entry.state === 'published') return { status: 'skipped', reason: 'already published', media_id: entry.media_id };

  ledger.update(post.id, { attempts: (entry.attempts || 0) + 1, format: post.format, scheduled_at: post.scheduled_at, tracking: post.tracking });
  try {
    // An earlier run may have called media_publish and lost the response: check before doing anything else.
    if (entry.state === 'publishing') {
      const hit = await reconcile(client, igUserId, caption);
      if (hit) return done(ledger, post.id, hit.id, hit.permalink, 'reconciled');
      ledger.update(post.id, { state: 'containers_ready' });
    }
    entry = ledger.get(post.id);
    let creationId = entry.creation_id;
    if (!creationId) {
      if (post.format === 'carousel') {
        const children = [...(entry.child_ids || [])];
        for (let i = children.length; i < post.media.length; i++) {
          const c = await client.post(`${igUserId}/media`, { image_url: mediaUrl(post.media[i], cfg), is_carousel_item: true, alt_text: post.alt_text[i] });
          children.push(c.id);
          ledger.update(post.id, { state: 'creating_children', child_ids: children });
        }
        for (const c of children) await waitFinished(client, c, { sleep, pollMs, pollMax });
        creationId = (await client.post(`${igUserId}/media`, { media_type: 'CAROUSEL', children: children.join(','), caption })).id;
      } else if (post.format === 'image') {
        creationId = (await client.post(`${igUserId}/media`, { image_url: mediaUrl(post.media[0], cfg), caption, alt_text: post.alt_text[0] })).id;
      } else {
        creationId = (await client.post(`${igUserId}/media`, { media_type: 'REELS', video_url: mediaUrl(post.media[0], cfg), caption, share_to_feed: true })).id;
      }
      ledger.update(post.id, { state: 'containers_ready', creation_id: creationId });
    }
    await waitFinished(client, creationId, { sleep, pollMs, pollMax });

    ledger.update(post.id, { state: 'publishing' });
    let pub;
    try {
      pub = await client.post(`${igUserId}/media_publish`, { creation_id: creationId }, { retry: false });
    } catch (err) {
      // Unknown outcome on transient failure: verify against the live feed rather than blindly retrying.
      if (err.transient) {
        const hit = await reconcile(client, igUserId, caption);
        if (hit) return done(ledger, post.id, hit.id, hit.permalink, 'reconciled');
        pub = await client.post(`${igUserId}/media_publish`, { creation_id: creationId });
      } else throw err;
    }
    const meta = await client.get(pub.id, { fields: 'permalink' }).catch(() => ({}));
    return done(ledger, post.id, pub.id, meta.permalink, 'published');
  } catch (err) {
    ledger.addError(post.id, `${err.message}${err.guidance ? ' | ' + err.guidance : ''}`);
    // A dead container must be rebuilt; any other failure keeps state so the next run resumes safely.
    ledger.update(post.id, err.containerDead ? { state: 'failed', creation_id: null, child_ids: [] } : { state: ledger.get(post.id).state === 'publishing' ? 'publishing' : 'failed' });
    log(`FAILED ${post.id}: ${err.message}`);
    return { status: 'failed', error: err.message, guidance: err.guidance };
  }
}

function done(ledger, id, mediaId, permalink, how) {
  ledger.update(id, { state: 'published', media_id: mediaId, permalink: permalink || null, published_at: new Date().toISOString(), how });
  return { status: how, media_id: mediaId, permalink };
}
