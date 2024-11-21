//historyRoutes.js

const express = require('express');
const router = express.Router();
const { addFeedback } = require('../controllers/historyController');
const { verifyAdminToken, history_protect } = require('../middleware/authMiddleware');
const pool = require('../config/rawDatabase'); // Import the MySQL pool


// Route to add feedback
router.post('/add-feedback', addFeedback);

// Route to get volunteer history
router.get('/history/:volunteerId', async (req, res) => {
  try {
      const { volunteerId } = req.params;

      if (isNaN(parseInt(volunteerId, 10))) {
          return res.status(400).json({ message: 'Invalid Volunteer ID' });
      }

      // Call the stored procedure
      const [rows] = await pool.execute('CALL GetVolunteerHistory(?)', [parseInt(volunteerId, 10)]);
      console.log(rows[0]);
      res.status(200).json(rows[0]); // Return the first result set
  } catch (error) {
      console.error('Error fetching volunteer history:', error);
      res.status(500).json({ message: 'Failed to fetch volunteer history', error: error.message });
  }
});


module.exports = router;
