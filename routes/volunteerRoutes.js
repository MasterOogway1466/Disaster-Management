// routes/volunteerRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { registerVolunteer, getVolunteersWithDisasters } = require('../controllers/volunteerController');


// Register as a volunteer with a unique route
router.post('/volunteer-register', protect, registerVolunteer);

router.get('/list', getVolunteersWithDisasters);

module.exports = router;