const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Register a new admin
router.post('/admin-register', adminController.registerAdmin);

// Login for existing admin
router.post('/admin-login', adminController.loginAdmin);

module.exports = router;
