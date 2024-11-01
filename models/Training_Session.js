const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Volunteer = require('./Volunteer');

const TrainingSession = sequelize.define('Training_Session', {
  session_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  Validity: { type: DataTypes.INTEGER },
  Conducted_by: { type: DataTypes.INTEGER, references: { model: Volunteer, key: 'Volunteer_ID' }}
});

module.exports = TrainingSession;
