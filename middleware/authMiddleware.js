const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Middleware to protect routes (validates token for both User and Admin)
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user based on token’s payload
    const user = await User.findByPk(decoded.userId); // Adjust field based on JWT payload structure

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object for access in route handlers
    req.user = user;
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

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId || decoded.adminId }; // Make sure `userId` is available
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

exports.verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const admin = await Admin.findByPk(decoded.adminId);
    if (!admin) return res.status(403).json({ message: 'Admin access only' });
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.history_protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the token belongs to a user or an admin
    const user = await User.findByPk(decoded.userId);
    const admin = await Admin.findByPk(decoded.adminId);

    if (!user && !admin) {
      return res.status(403).json({ message: 'Forbidden. Invalid user or admin.' });
    }

    req.role = user ? 'user' : 'admin'; // Assign role for later use
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
