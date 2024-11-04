// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/authController'); // Ensure correct import from authController
const { login } = require('../controllers/authController'); // Import the login function
const { register } = require('../controllers/authController'); // Import the register function

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route
router.get('/profile', verifyToken, getUserProfile);


module.exports = router;
