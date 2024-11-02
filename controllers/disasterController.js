// controllers/disasterController.js
const Disaster = require('../models/Disaster');

exports.createDisaster = async (req, res) => {
  const { name, disasterType, location, severity, startDate, endDate } = req.body;
  try {
    const disaster = await Disaster.create({ name, disasterType, location, severity, startDate, endDate });
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
