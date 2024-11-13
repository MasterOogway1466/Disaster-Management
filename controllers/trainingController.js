// controllers/trainingController.js
const TrainingSession = require('../models/Training_Session');
const SessionRegistrations = require('../models/Session_registrations');
const Volunteer = require('../models/Volunteer');

// Get all training sessions
exports.getTrainingSessions = async (req, res) => {
  try {
    const sessions = await TrainingSession.findAll({
      include: {
        model: Volunteer,
        as: 'ConductedByVolunteer', // Use alias to avoid conflict
        attributes: ['first_name', 'last_name'], // Fetch volunteer name fields
      }
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch training sessions' });
  }
};

// Create a new training session (admins only)
exports.createTrainingSession = async (req, res) => {
  const { session_name, Date, Validity, Conducted_by } = req.body;
  try {
    const session = await TrainingSession.create({ session_name, Date, Validity, Conducted_by });
    res.status(201).json({ message: 'Training session created', session });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create session', error: error.message });
  }
};

// Register for a session (volunteers only)
exports.registerForSession = async (req, res) => {
  const { Session_ID } = req.body;
  console.log(req.user);

  try {
    // Retrieve the current user's `userId` from the token
    const userId = req.user.userId;

    // Find the corresponding volunteer using `user_id`
    const volunteer = await Volunteer.findOne({ where: { user_id: userId } });
    if (!volunteer) {
      return res.status(404).json({ message: 'Please register as a volunteer before registering for a session!' });
    }

    // Use `Volunteer_ID` for session registration
    const Volunteer_ID = volunteer.Volunteer_ID;

     // Fetch the session and check if this volunteer is conducting it
     const session = await TrainingSession.findByPk(Session_ID);
     if (!session) {
       return res.status(404).json({ message: 'Training session not found' });
     }
 
     if (session.Conducted_by === Volunteer_ID) {
       return res.status(400).json({ message: 'You cannot register for a session you are conducting' });
     }

    // Check if the volunteer is already registered for this session
    const existingRegistration = await SessionRegistrations.findOne({
      where: { Session_ID, Volunteer_ID }
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You have already registered for this session.' });
    }

    // Register the volunteer for the session
    const registration = await SessionRegistrations.create({
      Session_ID,
      Volunteer_ID,
      Status: 'registered',
      Final_registration_date: new Date(),
    });

    res.status(201).json({ message: 'Successfully registered for session', registration });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register for session', error: error.message });
  }
};