const http = require('http');
const fs = require('fs');
const path = require('path');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(path.join(__dirname, '.env'));

const PORT = process.env.CONTACT_SERVER_PORT || 7008;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function maskKey(key) {
  if (!key) return '(empty)';
  if (key.length <= 8) return '*'.repeat(key.length);
  return key.slice(0, 4) + '*'.repeat(key.length - 8) + key.slice(-4);
}

async function sendToMsg91({ name, email, phone, service, message }) {
  const payload = {
    recipients: [
      {
        to: [{ email: process.env.MSG91_TO_EMAIL, name: process.env.MSG91_TO_NAME }],
        variables: {
          name,
          email,
          phone: phone || 'N/A',
          service: service || 'N/A',
          message,
        },
      },
    ],
    from: { email: process.env.MSG91_FROM_EMAIL, name: process.env.MSG91_FROM_NAME },
    domain: process.env.MSG91_DOMAIN,
    template_id: process.env.MSG91_TEMPLATE_ID,
  };

  console.log('[msg91] authkey used:', maskKey(process.env.MSG91_AUTH_KEY), 'length:', (process.env.MSG91_AUTH_KEY || '').length);
  console.log('[msg91] request payload:', JSON.stringify(payload));

  const res = await fetch('https://control.msg91.com/api/v5/email/send', {
    method: 'POST',
    headers: {
      authkey: process.env.MSG91_AUTH_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();
  console.log('[msg91] response status:', res.status);
  console.log('[msg91] response headers:', Object.fromEntries(res.headers.entries()));
  console.log('[msg91] response body:', rawText);

  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    data = null;
  }

  if (!res.ok || !data || data.type === 'error' || data.status === 'fail') {
    const err = new Error(data?.message || data?.errors || 'Failed to send email');
    err.status = 502;
    throw err;
  }
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/api/contact') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const service = (data.service || '').trim();
    const message = (data.message || '').trim();

    if (!name || !EMAIL_REGEX.test(email) || !message) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing or invalid required fields' }));
      return;
    }

    try {
      await sendToMsg91({ name, email, phone, service, message });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.writeHead(err.status || 502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Contact server listening on port ${PORT}`);
});
