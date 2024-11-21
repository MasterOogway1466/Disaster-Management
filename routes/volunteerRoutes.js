// routes/volunteerRoutes.js
const express = require('express');
const router = express.Router();
const { protect, verifyToken } = require('../middleware/authMiddleware');
const { registerVolunteer, getVolunteersWithDisasters } = require('../controllers/volunteerController');
const Volunteer = require('../models/Volunteer');



// Register as a volunteer with a unique route
router.post('/volunteer-register', protect, registerVolunteer);

router.get('/list', getVolunteersWithDisasters);

router.get('/check/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Check if the user exists in the volunteers table
      const volunteer = await Volunteer.findOne({ where: { user_id: userId } });
  
      res.json({ isVolunteer: !!volunteer });
    } catch (error) {
      console.error('Error checking volunteer status:', error);
      res.status(500).json({ message: 'Failed to check volunteer status', error: error.message });
    }
  });

module.exports = router;