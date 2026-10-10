// Durable publish ledger (JSON). The ledger is what makes retries safe: a post is never created twice.
import fs from 'node:fs';
import path from 'node:path';

export class Ledger {
  constructor(file) {
    this.file = file;
    this.data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { posts: {} };
  }
  get(id) { return this.data.posts[id]; }
  all() { return this.data.posts; }
  update(id, patch) {
    const cur = this.data.posts[id] || { id, attempts: 0, errors: [] };
    this.data.posts[id] = { ...cur, ...patch, updated_at: new Date().toISOString() };
    this.save();
    return this.data.posts[id];
  }
  addError(id, message) {
    const cur = this.get(id) || { errors: [] };
    return this.update(id, { errors: [...(cur.errors || []), { at: new Date().toISOString(), message }].slice(-10) });
  }
  save() {
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(this.data, null, 2) + '\n');
    fs.renameSync(tmp, this.file);
  }
}
