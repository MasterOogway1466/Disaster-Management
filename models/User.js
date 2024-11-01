const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  User_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  First_name: { type: DataTypes.STRING, allowNull: false },
  Last_name: { type: DataTypes.STRING, allowNull: false },
  Username: { type: DataTypes.STRING, allowNull: false, unique: true },
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
  Phone_number: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  DOB: { type: DataTypes.DATE }
});

module.exports = User;
