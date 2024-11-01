const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TrainingSession = require('./Training_Session');
const Volunteer = require('./Volunteer');

const SessionRegistrations = sequelize.define('Session_registrations', {
  Session_ID: { type: DataTypes.INTEGER, references: { model: TrainingSession, key: 'session_ID' }},
  Volunteer_ID: { type: DataTypes.INTEGER, references: { model: Volunteer, key: 'Volunteer_ID' }},
  Status: { type: DataTypes.ENUM('registered', 'completed', 'failed') },
  Final_registration_date: { type: DataTypes.DATE },
  Successful_Completion: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { primaryKey: ['Session_ID', 'Volunteer_ID'] });

module.exports = SessionRegistrations;
