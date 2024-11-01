const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Volunteer = require('./Volunteer');
const Disaster = require('./Disaster');

const History = sequelize.define('History', {
  History_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Feedback: { type: DataTypes.TEXT },
  Volunteer_ID: { type: DataTypes.INTEGER, references: { model: Volunteer, key: 'Volunteer_ID' }},
  Disaster_ID: { type: DataTypes.INTEGER, references: { model: Disaster, key: 'Disaster_ID' }}
});

module.exports = History;
