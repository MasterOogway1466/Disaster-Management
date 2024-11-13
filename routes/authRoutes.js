// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, protect } = require('../middleware/authMiddleware'); 
const { getUserProfile, login, register, updateUserProfile } = require('../controllers/authController'); 
// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route
router.get('/profile', verifyToken, getUserProfile);

router.put('/profile', protect, updateUserProfile);


module.exports = router;
