const env = require('../config/env');

function maskKey(key) {
  if (!key) return '(empty)';
  if (key.length <= 8) return '*'.repeat(key.length);
  return key.slice(0, 4) + '*'.repeat(key.length - 8) + key.slice(-4);
}

// Sends the notification email through MSG91 using the shared template. Throws an error with .status on failure.
async function sendMail({ name, email, phone, service, message }) {
  const c = env.msg91;
  const payload = {
    recipients: [
      {
        to: [{ email: c.toEmail, name: c.toName }],
        variables: { name, email, phone: phone || 'N/A', service: service || 'N/A', message },
      },
    ],
    from: { email: c.fromEmail, name: c.fromName },
    domain: c.domain,
    template_id: c.templateId,
  };

  console.log('[msg91] authkey used:', maskKey(c.authKey), 'for', service || 'contact');

  const res = await fetch('https://control.msg91.com/api/v5/email/send', {
    method: 'POST',
    headers: { authkey: c.authKey, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();
  console.log('[msg91] response status:', res.status);

  let data = null;
  try {
    data = JSON.parse(rawText);
  } catch {
    // non-JSON body: treated as failure below when the status is not ok
  }

  if (!res.ok || !data || data.type === 'error' || data.status === 'fail') {
    const err = new Error(data?.message || data?.errors || 'Failed to send email');
    err.status = 502;
    throw err;
  }
}

const isConfigured = () => Boolean(env.msg91.authKey);

module.exports = { sendMail, isConfigured };
