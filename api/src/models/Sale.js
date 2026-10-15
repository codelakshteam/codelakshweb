const mongoose = require('mongoose');

// A person who applied to join the team / for a role. Stored in the `sales` collection of the codelaksh database.
const saleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150, index: true },
    phone: { type: String, required: true, match: /^[6-9]\d{9}$/ },
    city: { type: String, required: true, trim: true, maxlength: 80 },
    occupation: { type: String, default: '', maxlength: 80 },
    experience: { type: String, default: '', maxlength: 40 },
    reach: { type: String, default: '', maxlength: 40 },
    message: { type: String, default: '', maxlength: 2000 },
    source: { type: String, default: '', maxlength: 80 },
    role: { type: String, default: null }, // job slug when applying from /careers
    ip: { type: String, default: '' },
    type: { type: String, default: 'team-application' },
    status: { type: String, enum: ['new', 'contacted', 'selected', 'rejected'], default: 'new' },
    createdAt: { type: Date, default: Date.now, index: -1 },
  },
  { id: false, collection: 'sales', versionKey: false }
);

module.exports = mongoose.model('Sale', saleSchema);
