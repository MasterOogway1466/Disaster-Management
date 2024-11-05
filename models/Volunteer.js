// models/Volunteer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Volunteer = sequelize.define('Volunteer', {
  Volunteer_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone_number: { type: DataTypes.STRING },
  DOB: { type: DataTypes.DATE },
  Disaster_ID: { type: DataTypes.INTEGER },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'Users', // This should match the name of your User model
      key: 'User_ID'
    }
  }
});

module.exports = Volunteer;

