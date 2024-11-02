// routes/volunteerRoutes.js
const express = require('express');
const { registerVolunteer, assignVolunteerToDisaster } = require('../controllers/volunteerController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Only admin can register volunteers
router.post('/register', protect, authorize('admin'), registerVolunteer);

// Assign volunteers to disasters (admin only)
router.post('/assign-disaster', protect, authorize('admin'), assignVolunteerToDisaster);

module.exports = router;
