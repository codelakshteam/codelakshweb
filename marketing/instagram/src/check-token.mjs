#!/usr/bin/env node
// Detects token problems before they break a publish run. Exit 0 = OK, 1 = expiring/invalid, 2 = not configured.
import { igEnv, cfg } from './common.mjs';
import { createClient } from './graph.mjs';

const env = igEnv();
if (!env.igUserId || !env.token) { console.log('NOT CONFIGURED: set IG_USER_ID and IG_ACCESS_TOKEN (see README, Setup).'); process.exit(2); }
const client = createClient({ host: env.host, version: env.version, token: env.token, maxAttempts: 2 });
try {
  const me = await client.get(env.igUserId, { fields: 'username,account_type' });
  console.log(`OK: connected as @${me.username}${me.account_type ? ` (${me.account_type})` : ''}`);
  if (process.env.META_APP_ID && process.env.META_APP_SECRET) {
    const dbg = await createClient({ host: env.host, version: env.version, token: `${process.env.META_APP_ID}|${process.env.META_APP_SECRET}` }).get('debug_token', { input_token: env.token });
    const d = dbg.data || {};
    const scopes = d.scopes || [];
    const missing = ['instagram_basic', 'instagram_content_publish', 'instagram_manage_insights'].filter((s) => !scopes.includes(s));
    if (missing.length) { console.log(`MISSING PERMISSIONS: ${missing.join(', ')}. Re-authorize with these scopes.`); process.exit(1); }
    if (d.expires_at) {
      const days = Math.floor((d.expires_at * 1000 - Date.now()) / 864e5);
      console.log(`Token expires in ${days} day(s).`);
      if (days < cfg.tokenWarnDays) { console.log('ACTION REQUIRED: renew the token now (README, "Token renewal").'); process.exit(1); }
    } else console.log('Token does not expire (page-derived token).');
  } else console.log('Tip: set META_APP_ID and META_APP_SECRET to enable expiry/permission checks.');
  const lim = await client.get(`${env.igUserId}/content_publishing_limit`, { fields: 'quota_usage,config' }).catch(() => null);
  if (lim?.data?.[0]) console.log(`Publishing quota used (24h): ${lim.data[0].quota_usage}/${lim.data[0].config?.quota_total ?? '?'}`);
} catch (e) {
  console.log(`FAILED: ${e.message}${e.guidance ? '\n -> ' + e.guidance : ''}`);
  process.exit(1);
}
