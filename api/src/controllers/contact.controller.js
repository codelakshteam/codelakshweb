const { sendMail } = require('../services/mailer');
const { clean, EMAIL_REGEX } = require('../utils/clean');

// POST /api/contact: the contact form. Emails the team; nothing is stored.
exports.create = async (req, res) => {
  const body = req.body || {};
  const name = clean(body.name, 100);
  const email = clean(body.email, 150);
  const phone = clean(body.phone, 20);
  const service = clean(body.service, 200);
  const message = clean(body.message, 4000);

  if (!name || !EMAIL_REGEX.test(email) || !message) {
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  try {
    await sendMail({ name, email, phone, service, message });
    res.json({ success: true });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
};
