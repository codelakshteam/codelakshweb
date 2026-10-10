// Daily publishing summary + weekly performance report. Never invents numbers: missing metrics print "n/a".
import fs from 'node:fs';
import path from 'node:path';
import { paths, istDate } from './common.mjs';

const n = (v) => (v === null || v === undefined ? 'n/a' : v);

export function writeDailySummary({ ledger, posts, results = [], now = new Date(), live = false }) {
  const day = istDate(now);
  const all = ledger.all();
  const published = Object.values(all).filter((e) => e.state === 'published' && (e.published_at || '').slice(0, 10) === now.toISOString().slice(0, 10));
  const failed = Object.values(all).filter((e) => e.state === 'failed' || e.state === 'publishing');
  const pending = posts.filter((p) => all[p.id]?.state !== 'published');
  const lines = [`# Instagram daily summary - ${day} (IST)`, '', `Mode: ${live ? 'LIVE' : 'DRY RUN (nothing was posted)'}`, '',
    `## Published today (${published.length})`, ...(published.map((e) => `- ${e.id}: ${e.permalink || 'permalink unavailable'}`)), ...(published.length ? [] : ['- none']), '',
    `## Failed / needs attention (${failed.length})`, ...(failed.map((e) => `- ${e.id} [${e.state}]: ${(e.errors || []).slice(-1)[0]?.message || 'no detail'}`)), ...(failed.length ? [] : ['- none']), '',
    `## Queue (${pending.length})`, ...pending.map((p) => `- ${p.id} | ${p.status} | ${p.scheduled_at}`), '',
    `## This run`, ...(results.length ? results.map((r) => `- ${r.id}: ${r.status}${r.errors ? ' - ' + r.errors.join('; ') : ''}`) : ['- nothing due'])];
  fs.mkdirSync(path.join(paths.reports, 'daily'), { recursive: true });
  const file = path.join(paths.reports, 'daily', `${day}.md`);
  fs.writeFileSync(file, lines.join('\n') + '\n');
  return file;
}

export function loadSnapshots(dir = paths.metrics) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

export function writeWeeklyReport({ snapshots, ledger, now = new Date() }) {
  const day = istDate(now);
  const last = snapshots[snapshots.length - 1];
  const weekAgo = snapshots.filter((s) => (now - new Date(s.taken_at)) / 864e5 >= 6).pop();
  const lines = [`# Instagram weekly report - week ending ${day}`, ''];
  if (!last) {
    lines.push('No analytics snapshots yet. Connect the account (README) and run `node marketing/instagram/src/analytics.mjs`. Nothing is estimated.');
  } else {
    const f = last.account?.followers_count ?? null;
    const f0 = weekAgo?.account?.followers_count ?? null;
    lines.push('## Account', `- Followers: ${n(f)}${f !== null && f0 !== null ? ` (${f - f0 >= 0 ? '+' : ''}${f - f0} vs 7 days ago)` : ' (no 7-day baseline yet)'}`);
    for (const [k, v] of Object.entries(last.account?.insights || {})) lines.push(`- ${k} (last 7d): ${n(v)}`);
    const posts = (last.media || []).filter((m) => m.metrics);
    lines.push('', `## Posts (${posts.length} with insights)`);
    const rate = (m) => (m.metrics.reach ? (m.metrics.total_interactions ?? 0) / m.metrics.reach : null);
    posts.sort((a, b) => (rate(b) ?? -1) - (rate(a) ?? -1));
    lines.push('| Post | Format | Pillar | Reach | Saves | Shares | Interactions | Eng. rate |', '|---|---|---|---|---|---|---|---|');
    for (const m of posts) lines.push(`| ${m.id} | ${m.format} | ${m.pillar || 'n/a'} | ${n(m.metrics.reach)} | ${n(m.metrics.saved)} | ${n(m.metrics.shares)} | ${n(m.metrics.total_interactions)} | ${rate(m) === null ? 'n/a' : (rate(m) * 100).toFixed(1) + '%'} |`);
    const group = (key) => {
      const g = {};
      for (const m of posts) { const k = key(m); (g[k] ||= []).push(rate(m)); }
      return Object.entries(g).map(([k, v]) => { const x = v.filter((y) => y !== null); return `- ${k}: ${x.length ? ((x.reduce((s, y) => s + y, 0) / x.length) * 100).toFixed(1) + '% avg engagement (n=' + x.length + ')' : 'n/a'}`; });
    };
    if (posts.length) lines.push('', '## By format', ...group((m) => m.format), '', '## By content pillar', ...group((m) => m.pillar || 'n/a'), '', '## By publish hour (IST)', ...group((m) => m.hour_ist ?? 'n/a'));
    if (posts.length < 10) lines.push('', `> Only ${posts.length} posts have data. Treat rankings as directional, not conclusive; run at least 10-15 posts per format before changing strategy.`);
    lines.push('', '## Not available via API', '- Qualified leads: track via UTM parameters (utm_source=instagram) in website analytics and the contact form; Instagram does not report them.');
  }
  fs.mkdirSync(path.join(paths.reports, 'weekly'), { recursive: true });
  const file = path.join(paths.reports, 'weekly', `${day}.md`);
  fs.writeFileSync(file, lines.join('\n') + '\n');
  return file;
}
