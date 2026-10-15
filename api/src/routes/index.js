const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const rateLimit = require('../middleware/rateLimit');
const contact = require('../controllers/contact.controller');
const team = require('../controllers/team.controller');
const jobs = require('../controllers/jobs.controller');

const router = express.Router();

// Contact form
router.post('/contact', rateLimit({ max: 20 }), contact.create);

// Team / job applications
router.post('/team-apply', rateLimit({ max: 5 }), team.apply);
router.get('/team-applications', adminAuth, team.list);
router.patch('/team-applications/:id', adminAuth, team.updateStatus);

// Careers
router.get('/jobs', jobs.list);
router.get('/jobs/:slug', jobs.get);
router.post('/jobs', adminAuth, jobs.upsert);

module.exports = router;
