const fs = require('fs');
const path = require('path');
const env = require('../config/env');

// Local JSON-lines file used only while MongoDB is unreachable, so a lead is never lost.
const FILE = path.join(env.dataDir, 'team-applications.jsonl');

function append(entry) {
  fs.mkdirSync(env.dataDir, { recursive: true });
  fs.appendFileSync(FILE, JSON.stringify(entry) + '\n');
}

function readAll() {
  if (!fs.existsSync(FILE)) return [];
  return fs
    .readFileSync(FILE, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

module.exports = { append, readAll };
