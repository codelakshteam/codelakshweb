#!/usr/bin/env node
// Usage: node marketing/instagram/src/approve.mjs --all | --post <id>   (flips status draft -> approved after validation)
import fs from 'node:fs';
import path from 'node:path';
import { args, cfg, paths, loadPosts } from './common.mjs';
import { validatePost } from './validate.mjs';

const a = args();
for (const p of loadPosts()) {
  if (!(a.all || a.post === p.id)) continue;
  const v = validatePost(p, cfg, { publicDir: paths.publicDir });
  if (v.errors.length) { console.log(`NOT approved ${p.id}:\n  ${v.errors.join('\n  ')}`); continue; }
  const { _file, ...rest } = p;
  fs.writeFileSync(path.join(paths.posts, _file), JSON.stringify({ ...rest, status: 'approved' }, null, 2) + '\n');
  console.log(`approved ${p.id}`);
}
