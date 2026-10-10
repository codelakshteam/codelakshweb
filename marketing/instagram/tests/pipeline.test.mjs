import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createClient } from '../src/graph.mjs';
import { Ledger } from '../src/ledger.mjs';
import { publishPost } from '../src/publisher.mjs';
import { validatePost, buildCaption } from '../src/validate.mjs';
import { cfg, paths, loadPosts } from '../src/common.mjs';

const post = () => ({ ...loadPosts()[0] });
const tmpLedger = () => new Ledger(path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'ig-')), 'ledger.json'));
const json = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });

// Fake Graph API that records calls; `script` can override responses per endpoint.
function fakeGraph(script = {}) {
  const calls = [];
  let n = 0;
  const fetchImpl = async (url, init) => {
    const u = new URL(url);
    const ep = u.pathname.split('/').slice(2).join('/');
    calls.push({ method: init.method, ep, body: init.body, auth: init.headers.Authorization, url });
    const hook = script[ep.replace(/^\d+\//, '')] || script[ep];
    if (hook) { const r = hook(calls.filter((c) => c.ep === ep).length); if (r) return r; }
    if (ep.endsWith('/media') && init.method === 'POST') return json({ id: `c${++n}` });
    if (ep.endsWith('/media_publish')) return json({ id: 'm1' });
    if (ep.endsWith('/media')) return json({ data: [] });
    if (ep === 'm1') return json({ permalink: 'https://instagram.com/p/x' });
    return json({ status_code: 'FINISHED' });
  };
  return { fetchImpl, calls };
}
const run = (g, ledger, p = post()) => publishPost(p, cfg, { client: createClient({ token: 'SECRET', fetchImpl: g.fetchImpl, sleep: async () => {} }), ledger, igUserId: '1', log: () => {}, sleep: async () => {}, pollMax: 3 });

test('first two posts validate against real assets', () => {
  for (const p of loadPosts()) assert.deepEqual(validatePost(p, cfg, { publicDir: paths.publicDir }).errors, [], p.id);
});

test('validation blocks unverifiable claims, unknown prices, bad links, too many hashtags', () => {
  const p = post();
  p.caption += ' Guaranteed results! Only Rs. 99 today.';
  p.link = 'https://evil.example/x';
  p.hashtags = ['#a', '#b', '#c', '#d', '#e', '#f'];
  const e = validatePost(p, cfg, { publicDir: paths.publicDir }).errors.join('|');
  assert.match(e, /guaranteed/i); assert.match(e, /Rs\. 99/); assert.match(e, /link host/); assert.match(e, /hashtags/);
});

test('publishes a carousel, records ledger, token only in header', async () => {
  const g = fakeGraph(); const l = tmpLedger();
  const r = await run(g, l);
  assert.equal(r.status, 'published');
  assert.equal(l.get(post().id).state, 'published');
  assert.equal(g.calls.filter((c) => c.ep === '1/media_publish').length, 1);
  assert.ok(g.calls.every((c) => c.auth === 'Bearer SECRET' && !c.url.includes('SECRET') && !(c.body || '').includes('SECRET')));
});

test('duplicate prevention: second run never creates or publishes again', async () => {
  const g = fakeGraph(); const l = tmpLedger();
  await run(g, l); const before = g.calls.length;
  const r = await run(g, l);
  assert.equal(r.status, 'skipped'); assert.equal(g.calls.length, before);
});

test('transient errors are retried and still produce exactly one post', async () => {
  const g = fakeGraph({ '1/media': (i) => (i === 1 ? json({ error: { message: 'x', code: 2, is_transient: true } }, 500) : null) });
  const r = await run(g, tmpLedger());
  assert.equal(r.status, 'published');
  assert.equal(g.calls.filter((c) => c.ep === '1/media_publish').length, 1);
});

test('lost media_publish response is reconciled against the feed, not re-posted', async () => {
  const p = post(); const caption = buildCaption(p, cfg);
  const g = fakeGraph({
    '1/media_publish': () => json({ error: { message: 'timeout', code: 2 } }, 500),
    '1/media': (i, ) => null,
  });
  // after the failed publish, the feed shows the post
  const orig = g.fetchImpl;
  g.fetchImpl = async (url, init) => {
    if (init.method === 'GET' && new URL(url).pathname.endsWith('/1/media')) return json({ data: [{ id: 'live9', caption, permalink: 'https://instagram.com/p/live9' }] });
    return orig(url, init);
  };
  const r = await run(g, tmpLedger(), p);
  assert.equal(r.status, 'reconciled'); assert.equal(r.media_id, 'live9');
  assert.equal(g.calls.filter((c) => c.ep === '1/media_publish').length, 1);
});

test('permanent failure reports guidance and is never marked published', async () => {
  const g = fakeGraph({ '1/media': () => json({ error: { message: 'expired', code: 190 } }, 400) });
  const l = tmpLedger();
  const r = await run(g, l);
  assert.equal(r.status, 'failed'); assert.match(r.guidance, /Re-authorize/);
  assert.notEqual(l.get(post().id).state, 'published');
});
