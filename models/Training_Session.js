const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Volunteer = require('./Volunteer');

const TrainingSession = sequelize.define('Training_Session', {
  session_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  session_name: { type: DataTypes.STRING, allowNull: false },
  Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  Validity: { type: DataTypes.INTEGER },
  Conducted_by: { type: DataTypes.INTEGER, references: { model: Volunteer, key: 'Volunteer_ID' }}
});

// Define association with cascading delete
TrainingSession.belongsTo(Volunteer, {
  as: 'ConductedByVolunteer',
  foreignKey: 'Conducted_by',
  onDelete: 'CASCADE'
});

Volunteer.hasMany(TrainingSession, {
  foreignKey: 'Conducted_by',
  onDelete: 'CASCADE'
});


module.exports = TrainingSession;
