const fs = require('fs');
const path = require('path');

// Minimal .env loader (no dependency). Values already in process.env win.
function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    if (!(key in process.env)) process.env[key] = trimmed.slice(idx + 1).trim();
  }
}

loadEnv(path.join(__dirname, '..', '..', '.env'));

const root = path.join(__dirname, '..', '..');

module.exports = {
  port: process.env.CONTACT_SERVER_PORT || 7008,
  adminToken: process.env.ADMIN_TOKEN || '',
  dnsServers: (process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1').split(',').map((s) => s.trim()).filter(Boolean),
  mongo: {
    uri: process.env.MONGODB_URI || '',
    db: process.env.MONGODB_DB || 'codelaksh',
  },
  dataDir: process.env.DATA_DIR || path.join(root, 'data'),
  msg91: {
    authKey: process.env.MSG91_AUTH_KEY,
    toEmail: process.env.MSG91_TO_EMAIL,
    toName: process.env.MSG91_TO_NAME,
    fromEmail: process.env.MSG91_FROM_EMAIL,
    fromName: process.env.MSG91_FROM_NAME,
    domain: process.env.MSG91_DOMAIN,
    templateId: process.env.MSG91_TEMPLATE_ID,
  },
};
