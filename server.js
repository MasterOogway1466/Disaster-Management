require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./config/database');
const User = require('./models/User'); // Import User model

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);


// Middleware to parse JSON requests
app.use(express.json());
// Test route to add a sample user
app.get('/test-user', async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { Username: 'johndoe' } });
        if (existingUser) {
            return res.json({ message: 'User already exists', user: existingUser });
        }

        // Create a new user if not exists
        const user = await User.create({
            First_name: 'John',
            Last_name: 'Doe',
            Username: 'johndoe',
            Email: 'johndoe@example.com',
            Phone_number: '1234567890',
            password: 'hashedpassword', // Replace with hashed password in production
            DOB: '1990-01-01'
        });
        res.json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Sync database and start the server
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

sequelize.sync({ force: true })
  .then(() => {
    console.log("Database & tables created!");
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(error => console.log("Error creating database tables:", error));
