const mongoose = require('mongoose');
const seed = require('../seeds/jobs.seed');

// An open role shown on /careers. Stored in the `jobs` collection of the codelaksh database.
const jobSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, match: /^[a-z0-9-]+$/ },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    department: { type: String, default: '', maxlength: 80 },
    type: { type: String, default: '', maxlength: 40 },
    employmentType: { type: String, default: 'INTERN', maxlength: 20 },
    location: { type: String, default: '', maxlength: 120 },
    duration: { type: String, default: '', maxlength: 40 },
    openings: { type: String, default: '', maxlength: 20 },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    summary: { type: String, default: '', maxlength: 600 },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
  },
  { collection: 'jobs', versionKey: false, timestamps: true }
);

// Insert the seeded roles that do not exist yet. Existing documents are never overwritten, so edits
// made in the database (or through POST /api/jobs) survive restarts.
jobSchema.statics.seedDefaults = async function seedDefaults() {
  for (const job of seed) {
    await this.updateOne({ slug: job.slug }, { $setOnInsert: job }, { upsert: true });
  }
};

module.exports = mongoose.model('Job', jobSchema);
