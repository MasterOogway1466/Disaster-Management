const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Middleware to protect routes (validates token for both User and Admin)
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save decoded token info in `req.user`
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to authorize based on role (checks if token is admin or user)
exports.authorize = (role) => {
  return async (req, res, next) => {
    try {
      let user;

      // If role is 'admin', look up the user in the Admin table by adminId
      if (role === 'admin' && req.user.adminId) {
        user = await Admin.findByPk(req.user.adminId);
      } 
      // If role is 'user', look up the user in the User table by userId
      else if (role === 'user' && req.user.userId) {
        user = await User.findByPk(req.user.userId);
      }

      // If no user is found or the role doesn’t match, return an error
      if (!user) {
        return res.status(403).json({ message: `Forbidden: Access restricted to ${role}` });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error authorizing user', error: error.message });
    }
  };
};

// Middleware to verify token and check its validity
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
