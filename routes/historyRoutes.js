const express = require('express');
const router = express.Router();
const { addFeedback } = require('../controllers/historyController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

// Route to add feedback
router.post('/add-feedback', addFeedback);

module.exports = router;
