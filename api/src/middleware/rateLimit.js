// Naive in-memory limiter: `max` requests per `windowMs` per IP. Enough for a single-process form endpoint.
module.exports = function rateLimit({ max = 5, windowMs = 60 * 60 * 1000 } = {}) {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const recent = (hits.get(req.ip) || []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(req.ip, recent);
    if (recent.length > max) return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
    next();
  };
};
