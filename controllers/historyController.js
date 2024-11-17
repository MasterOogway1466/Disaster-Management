const History = require('../models/History');
const Volunteer = require('../models/Volunteer');
const Disaster = require('../models/Disaster');

// Add feedback to a specific volunteer for a disaster
exports.addFeedback = async (req, res) => {
  const { Volunteer_ID, Disaster_ID, Feedback } = req.body;

  try {
    // Ensure the volunteer and disaster exist
    const volunteer = await Volunteer.findByPk(Volunteer_ID);
    const disaster = await Disaster.findByPk(Disaster_ID);

    if (!volunteer || !disaster) {
      return res.status(404).json({ message: 'Volunteer or Disaster not found' });
    }

    // Add or update feedback in the history table
    const [historyEntry] = await History.findOrCreate({
      where: { Volunteer_ID, Disaster_ID },
      defaults: { Feedback }
    });

    if (!historyEntry.isNewRecord) {
      historyEntry.Feedback = Feedback; // Update feedback if it already exists
      await historyEntry.save();
    }

    res.status(201).json({ message: 'Feedback added/updated successfully', history: historyEntry });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add feedback', error: error.message });
  }
};
