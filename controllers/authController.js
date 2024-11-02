// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { First_name, Last_name, Username, Email, Phone_number, password, DOB } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { [Sequelize.Op.or]: [{ Username }, { Email }] } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      First_name,
      Last_name,
      Username,
      Email,
      Phone_number,
      password: hashedPassword,
      DOB,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { Username, password } = req.body;
  try {
    const user = await User.findOne({ where: { Username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.User_ID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to log in', error: error.message });
  }
};
