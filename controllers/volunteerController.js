// controllers/volunteerController.js
const Volunteer = require('../models/Volunteer');
const Disaster = require('../models/Disaster');

exports.registerVolunteer = async (req, res) => {
  const { first_name, last_name, email, phone_number, DOB } = req.body;
  try {
    const newVolunteer = await Volunteer.create({ first_name, last_name, email, phone_number, DOB });
    res.status(201).json({ message: 'Volunteer registered successfully', volunteer: newVolunteer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register volunteer', error: error.message });
  }
};

exports.assignVolunteerToDisaster = async (req, res) => {
  const { disasterId, volunteerId } = req.body;

  try {
    // Check if the disaster exists
    const disaster = await Disaster.findByPk(disasterId);
    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }

    // Check if the volunteer exists
    const volunteer = await Volunteer.findByPk(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Update the volunteer's Disaster_ID to associate with the disaster
    volunteer.Disaster_ID = disasterId;
    await volunteer.save();

    res.status(200).json({ message: 'Volunteer assigned to disaster successfully', volunteer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign volunteer to disaster', error: error.message });
  }
};
