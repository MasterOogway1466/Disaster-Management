// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

exports.authorize = (role) => {
  return async (req, res, next) => {
    const user = await User.findByPk(req.user.userId);
    if (!user || user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
