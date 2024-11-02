// routes/disasterRoutes.js
const express = require('express');
const { createDisaster, getAllDisasters } = require('../controllers/disasterController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-disaster', protect, authorize('admin'), createDisaster);
router.get('/', protect, getAllDisasters);

module.exports = router;
