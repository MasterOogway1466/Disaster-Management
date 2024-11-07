// controllers/disasterController.js
const Disaster = require('../models/Disaster');
const Volunteer = require('../models/Volunteer');


exports.addDisaster = async (req, res) => {
  const { name, disasterType, location, severity, startDate} = req.body;
  try {
    const disaster = await Disaster.create({ name, disasterType, location, severity, startDate});
    res.status(201).json({ message: 'Disaster created successfully', disaster });
  } catch (error) {
    res.status(500).json({ message: 'Error creating disaster', error: error.message });
  }
};

exports.getAllDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.findAll();
    res.json({ disasters });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving disasters', error: error.message });
  }
};

exports.applyToDisaster = async (req, res) => {
  const disasterId = req.params.disasterId;
  const volunteerId = req.user.userId; // assuming req.user.userId stores volunteer's user ID

  try {
    // Find the disaster
    const disaster = await Disaster.findByPk(disasterId);
    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }

    // Ensure volunteer exists
    const volunteer = await Volunteer.findOne({ where: { user_id: volunteerId } });
    if (!volunteer) {
      return res.status(403).json({ message: 'Only volunteers can apply to disasters' });
    }

    // Link the volunteer to the disaster (update Volunteer model or use a junction table if needed)
    volunteer.Disaster_ID = disasterId;
    await volunteer.save();

    res.status(200).json({ message: 'Successfully applied to the disaster' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to apply to disaster', error: error.message });
  }
};