// models/Disaster.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disaster = sequelize.define('Disaster', {
  Disaster_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  disasterType: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  severity: { type: DataTypes.ENUM('low', 'medium', 'high', 'critical') },
  startDate: { type: DataTypes.DATE },
  endDate: { type: DataTypes.DATE }
});

module.exports = Disaster;
