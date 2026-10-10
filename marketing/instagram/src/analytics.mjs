#!/usr/bin/env node
// Usage: node marketing/instagram/src/analytics.mjs [--weekly]
// Pulls account + per-post insights through the official API into state/metrics/<date>.json.
// Any metric the API refuses is stored as null with the error, never estimated.
import fs from 'node:fs';
import path from 'node:path';
import { args, paths, igEnv, istDate } from './common.mjs';
import { createClient } from './graph.mjs';
import { Ledger } from './ledger.mjs';
import { loadSnapshots, writeWeeklyReport } from './report.mjs';

const a = args();
const env = igEnv();
const ledger = new Ledger(paths.ledger);
if (!env.igUserId || !env.token) {
  console.log('IG_USER_ID / IG_ACCESS_TOKEN not set: skipping API pull (reporting from existing snapshots).');
} else {
  const client = createClient({ host: env.host, version: env.version, token: env.token });
  const snap = { taken_at: new Date().toISOString(), account: { insights: {}, errors: [] }, media: [] };
  try { snap.account.followers_count = (await client.get(env.igUserId, { fields: 'followers_count,media_count,username' })).followers_count; }
  catch (e) { snap.account.errors.push(`profile: ${e.message}`); snap.account.followers_count = null; }
  const since = Math.floor(Date.now() / 1000) - 7 * 86400;
  for (const metric of ['reach', 'profile_views', 'website_clicks', 'accounts_engaged', 'total_interactions']) {
    try {
      const r = await client.get(`${env.igUserId}/insights`, { metric, period: 'day', metric_type: 'total_value', since, until: Math.floor(Date.now() / 1000) });
      snap.account.insights[metric] = r.data?.[0]?.total_value?.value ?? null;
    } catch (e) { snap.account.insights[metric] = null; snap.account.errors.push(`${metric}: ${e.message}`); }
  }
  for (const e of Object.values(ledger.all()).filter((x) => x.state === 'published' && x.media_id)) {
    const m = { id: e.id, media_id: e.media_id, format: e.format, pillar: e.tracking?.pillar, hour_ist: e.published_at ? new Date(new Date(e.published_at).getTime() + 5.5 * 3600e3).getUTCHours() : null, metrics: null };
    try {
      const metrics = {};
      const r = await client.get(`${e.media_id}/insights`, { metric: 'reach,saved,shares,likes,comments,total_interactions,views' });
      for (const d of r.data || []) metrics[d.name] = d.values?.[0]?.value ?? null;
      m.metrics = metrics;
    } catch (err) { m.error = err.message; }
    snap.media.push(m);
  }
  fs.mkdirSync(paths.metrics, { recursive: true });
  fs.writeFileSync(path.join(paths.metrics, `${istDate()}.json`), JSON.stringify(snap, null, 2) + '\n');
  console.log(`snapshot saved (${snap.media.length} posts, ${snap.account.errors.length} metric errors)`);
}
if (a.weekly) console.log('wrote', writeWeeklyReport({ snapshots: loadSnapshots(), ledger }));
