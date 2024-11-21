// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');


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

    const token = jwt.sign({ userId: user.User_ID }, process.env.JWT_SECRET, { expiresIn: '12h' });
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
      User_ID: user.User_ID,
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

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.dataValues.User_ID;
    const { First_name, Last_name, Username, Email, Phone_number } = req.body;
    await User.update(
      { First_name, Last_name, Username, Email, Phone_number },
      { where: { User_ID: userId }, returning: true }
    );
    const updatedUser=await User.findOne({ where: { User_ID: userId } });
    res.json(updatedUser.dataValues);
    console.log(updatedUser.dataValues);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};


exports.deleteUserProfile = async (req, res) => {
  console.log(req.user.dataValues.User_ID);
  try {
    const userId = req.user.dataValues.User_ID;

    // // Check if user is a volunteer
    // const volunteer = await Volunteer.findOne({ where: { user_id: userId } });
    // if (volunteer) {
    //   await volunteer.destroy(); // Deletes associated volunteer records
    // }

    // Delete user account
    await User.destroy({ where: { User_ID: userId } });

    console.log("Account and associated data deleted successfully");

    res.status(200).json({ message: 'Account and associated data deleted successfully' });
  } catch (error) {
    console.log("your code is wrong")
    res.status(500).json({ message: 'Failed to delete account', error: error.message });
  }
};

