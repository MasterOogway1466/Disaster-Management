// routes/trainingRoutes.js
const express = require('express');
const router = express.Router();
const { protect, verifyToken } = require('../middleware/authMiddleware');
const {
  getTrainingSessions,
  createTrainingSession,
  registerForSession
} = require('../controllers/trainingController');

// Route to get all training sessions (for both admins and volunteers)
router.get('/', getTrainingSessions);

// Route to create a training session (admins only)
router.post('/create', createTrainingSession);

// Route for volunteers to register for a training session
router.post('/register', verifyToken, registerForSession);

module.exports = router;
