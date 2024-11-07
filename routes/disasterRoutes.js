const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getAllDisasters, addDisaster, applyToDisaster } = require('../controllers/disasterController');

// Route for getting all disasters (for all authenticated users)
router.get('/', getAllDisasters);

// Route for adding a new disaster (admin only)
router.post('/add', addDisaster);

router.post('/:disasterId/apply', verifyToken, applyToDisaster);

module.exports = router;
