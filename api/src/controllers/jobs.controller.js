const Job = require('../models/Job');
const db = require('../config/db');
const { clean } = require('../utils/clean');

const PUBLIC_FIELDS = { _id: 0, createdAt: 0, updatedAt: 0 };

// GET /api/jobs: open roles.
exports.list = async (req, res) => {
  try {
    if (!db.isReady()) throw new Error('database not connected');
    const jobs = await Job.find({ status: 'open' }, PUBLIC_FIELDS).sort({ createdAt: -1 }).lean();
    res.json({ count: jobs.length, jobs });
  } catch (err) {
    console.error('[jobs] read failed:', err.message);
    res.status(502).json({ error: 'Database unavailable' });
  }
};

// GET /api/jobs/:slug
exports.get = async (req, res) => {
  try {
    if (!db.isReady()) throw new Error('database not connected');
    const job = await Job.findOne({ slug: req.params.slug, status: 'open' }, PUBLIC_FIELDS).lean();
    if (!job) return res.status(404).json({ error: 'Not found' });
    res.json(job);
  } catch (err) {
    console.error('[jobs] read failed:', err.message);
    res.status(502).json({ error: 'Database unavailable' });
  }
};

const list = (v) => (Array.isArray(v) ? v.map((x) => clean(x, 300)).filter(Boolean).slice(0, 20) : []);

// POST /api/jobs (admin): create or update a role by slug. status "closed" hides it.
exports.upsert = async (req, res) => {
  const body = req.body || {};
  const slug = clean(body.slug, 60).toLowerCase();
  const title = clean(body.title, 120);
  if (!/^[a-z0-9-]+$/.test(slug) || !title) return res.status(400).json({ error: 'slug and title are required' });

  const doc = {
    title,
    department: clean(body.department, 80),
    type: clean(body.type, 40),
    employmentType: clean(body.employmentType, 20) || 'INTERN',
    location: clean(body.location, 120),
    duration: clean(body.duration, 40),
    openings: clean(body.openings, 20),
    status: body.status === 'closed' ? 'closed' : 'open',
    summary: clean(body.summary, 600),
    responsibilities: list(body.responsibilities),
    requirements: list(body.requirements),
    benefits: list(body.benefits),
  };

  try {
    if (!db.isReady()) throw new Error('database not connected');
    await Job.updateOne({ slug }, { $set: doc }, { upsert: true });
    res.json({ success: true, slug });
  } catch (err) {
    console.error('[jobs] upsert failed:', err.message);
    res.status(502).json({ error: 'Database unavailable' });
  }
};
