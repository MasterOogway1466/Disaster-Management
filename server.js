require('dotenv').config();

const sequelize = require('./config/database');

sequelize.sync({ force: false })  // Set to 'true' only during development to recreate tables
  .then(() => console.log("Database & tables created!"))
  .catch((error) => console.log("Error creating database", error));