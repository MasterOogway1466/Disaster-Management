const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  Admin_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  First_name: { type: DataTypes.STRING, allowNull: false },
  Last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone_number: { type: DataTypes.STRING },
  Apps_approved: { type: DataTypes.INTEGER, defaultValue: 0 },
  Apps_rejected: { type: DataTypes.INTEGER, defaultValue: 0 },
  Apps_pending: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = Admin;