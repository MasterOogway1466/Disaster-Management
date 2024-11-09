// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
  const { first_name, last_name, username, email, phone_number, dob, password } = req.body;

  try {
    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      First_name: first_name,
      Last_name: last_name,
      Username: username,
      Email: email,
      Phone_number: phone_number,
      password: hashedPassword,
      DOB: dob
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.User_ID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, clearAdminToken: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to log in', error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId); // Assuming `User` is correctly imported and `req.user.id` is set
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Send user data (exclude sensitive info like password)
    res.json({
      first_name: user.First_name,
      last_name: user.Last_name,
      username: user.Username,
      email: user.Email,
      phone_number: user.Phone_number,
      dob: user.DOB,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user data' });
  }
};



