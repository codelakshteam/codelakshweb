import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPO = path.resolve(ROOT, '..', '..');
export const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'strategy.json'), 'utf8'));
export const paths = {
  posts: path.join(ROOT, 'posts'),
  ledger: path.join(ROOT, 'state', 'ledger.json'),
  metrics: path.join(ROOT, 'state', 'metrics'),
  reports: path.join(ROOT, 'reports'),
  publicDir: path.join(REPO, 'public'),
};
export const args = (argv = process.argv.slice(2)) => {
  const o = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  return o;
};
export const loadPosts = (dir = paths.posts) =>
  fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => ({ ...JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')), _file: f }));
export const igEnv = () => ({
  igUserId: process.env.IG_USER_ID,
  token: process.env.IG_ACCESS_TOKEN,
  host: process.env.IG_GRAPH_HOST || 'graph.facebook.com',
  version: process.env.IG_GRAPH_VERSION || 'v23.0',
});
export const istDate = (d = new Date()) => new Date(d.getTime() + 5.5 * 3600e3).toISOString().slice(0, 10);
