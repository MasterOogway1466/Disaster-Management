const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getAllDisasters, addDisaster } = require('../controllers/disasterController');

// Route for getting all disasters (for all authenticated users)
router.get('/', getAllDisasters);

// Route for adding a new disaster (admin only)
router.post('/add', addDisaster);

module.exports = router;
