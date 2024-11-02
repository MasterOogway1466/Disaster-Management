// models/Volunteer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Volunteer = sequelize.define('Volunteer', {
  Volunteer_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone_number: { type: DataTypes.STRING },
  DOB: { type: DataTypes.DATE },
  Disaster_ID: { type: DataTypes.INTEGER }
});

module.exports = Volunteer;
