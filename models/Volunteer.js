const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Disaster = require('./Disaster');
const History = require('./History');
const Admin = require('./Admin');

const Volunteer = sequelize.define('Volunteer', {
  Volunteer_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone_number: { type: DataTypes.STRING },
  DOB: { type: DataTypes.DATE },
  U_ID: { type: DataTypes.INTEGER, references: { model: User, key: 'User_ID' }},
  Disaster_ID: { type: DataTypes.INTEGER, references: { model: Disaster, key: 'Disaster_ID' }},
  History_ID: { type: DataTypes.INTEGER, references: { model: History, key: 'History_ID' }},
  Approved_by: { type: DataTypes.INTEGER, references: { model: Admin, key: 'Admin_ID' }}
});

module.exports = Volunteer;
