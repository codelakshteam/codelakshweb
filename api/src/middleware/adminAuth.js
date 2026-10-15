const crypto = require('crypto');
const env = require('../config/env');

// Protects admin endpoints with `Authorization: Bearer <ADMIN_TOKEN>`. Without ADMIN_TOKEN set, nothing is allowed.
module.exports = function adminAuth(req, res, next) {
  const token = env.adminToken;
  const given = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const ok = token && given.length === token.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(token));
  if (!ok) return res.status(401).json({ error: 'Unauthorized' });
  next();
};
