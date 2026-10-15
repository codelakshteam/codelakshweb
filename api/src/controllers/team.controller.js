const crypto = require('crypto');
const Sale = require('../models/Sale');
const db = require('../config/db');
const fallback = require('../services/fallbackStore');
const mailer = require('../services/mailer');
const { clean, EMAIL_REGEX, PHONE_REGEX } = require('../utils/clean');
const { toCsv } = require('../utils/csv');

const CSV_COLUMNS = ['id', 'createdAt', 'name', 'email', 'phone', 'city', 'occupation', 'experience', 'reach', 'message', 'source', 'role', 'status', 'ip'];

// POST /api/team-apply: a team / job application from the website.
exports.apply = async (req, res) => {
  const data = req.body || {};

  // Honeypot: bots fill the hidden field. Pretend success, store nothing.
  if (clean(data.website, 200)) return res.json({ success: true });

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    name: clean(data.name, 100),
    email: clean(data.email, 150).toLowerCase(),
    phone: clean(data.phone, 15).replace(/\D/g, ''),
    city: clean(data.city, 80),
    occupation: clean(data.occupation, 80),
    experience: clean(data.experience, 40),
    reach: clean(data.reach, 40),
    message: clean(data.message, 2000),
    source: clean(data.source, 80),
    role: clean(data.role, 60).toLowerCase() || null,
    ip: req.ip,
  };

  if (!entry.name || !EMAIL_REGEX.test(entry.email) || !PHONE_REGEX.test(entry.phone) || !entry.city) {
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  try {
    if (!db.isReady()) throw new Error('database not connected');
    await Sale.create(entry);
  } catch (err) {
    // Never lose a lead: keep it in a local file until the database is reachable again.
    console.error('[team] database save failed, using local file:', err.message);
    try {
      fallback.append({ ...entry, createdAt: entry.createdAt.toISOString() });
    } catch (err2) {
      console.error('[team] failed to store application:', err2);
      return res.status(500).json({ error: 'Could not save your application. Please try again.' });
    }
  }

  res.json({ success: true });

  // Best-effort email alert; the entry is already safely stored.
  if (mailer.isConfigured()) {
    mailer
      .sendMail({
        name: entry.name,
        email: entry.email,
        phone: entry.phone,
        service: entry.role ? `Job application: ${entry.role}` : 'Team / sales partner application',
        message: `City: ${entry.city}\nOccupation: ${entry.occupation || 'N/A'}\nExperience: ${entry.experience || 'N/A'}\nReach: ${entry.reach || 'N/A'}\n\n${entry.message || ''}`,
      })
      .catch((err) => console.error('[team] email alert failed:', err.message));
  }
};

// GET /api/team-applications[?format=csv] (admin): every application, newest first.
exports.list = async (req, res) => {
  let rows = [];
  try {
    if (!db.isReady()) throw new Error('database not connected');
    rows = await Sale.find({}, { _id: 0 }).sort({ createdAt: 1 }).lean();
  } catch (err) {
    console.error('[team] database read failed:', err.message);
    return res.status(502).json({ error: 'Database unavailable' });
  }
  rows = rows
    .map((r) => ({ ...r, createdAt: new Date(r.createdAt).toISOString() }))
    .concat(fallback.readAll()); // entries saved locally while the database was unreachable

  if (req.query.format === 'csv') {
    res.set({
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="team-applications.csv"',
    });
    return res.send(toCsv(CSV_COLUMNS, rows));
  }
  res.json({ count: rows.length, applications: rows.reverse() });
};

// PATCH /api/team-applications/:id (admin): move an application through the pipeline.
exports.updateStatus = async (req, res) => {
  const status = clean(req.body && req.body.status, 20);
  if (!Sale.schema.path('status').enumValues.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  try {
    const doc = await Sale.findOneAndUpdate({ id: req.params.id }, { status }, { new: true, projection: { _id: 0 } }).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    console.error('[team] status update failed:', err.message);
    res.status(502).json({ error: 'Database unavailable' });
  }
};
