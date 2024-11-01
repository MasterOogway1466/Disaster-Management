const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Admin = require('./Admin');

const Application = sequelize.define('Application', {
  Application_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  Status: { type: DataTypes.ENUM('approved', 'rejected', 'pending'), defaultValue: 'pending' },
  U_ID: { type: DataTypes.INTEGER, references: { model: User, key: 'User_ID' }},
  Admin_ID: { type: DataTypes.INTEGER, references: { model: Admin, key: 'Admin_ID' }}
});

module.exports = Application;
