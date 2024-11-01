const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Disaster = require('./Disaster');

const Request = sequelize.define('Request', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Status: { type: DataTypes.ENUM('open', 'closed', 'pending'), defaultValue: 'pending' },
  Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  Disaster_ID: { type: DataTypes.INTEGER, references: { model: Disaster, key: 'Disaster_ID' }}
});

module.exports = Request;
