const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
  const { First_name, Last_name, email, phone_number, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await Admin.create({
      First_name,
      Last_name,
      email,
      phone_number,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register admin', error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const adminToken = jwt.sign({ adminId: admin.Admin_ID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', adminToken });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
