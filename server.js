require('dotenv').config();

const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

sequelize.sync({ force: false })  // Set to 'true' only during development to recreate tables
  .then(() => console.log("Database & tables created!"))
  .catch((error) => console.log("Error creating database", error));