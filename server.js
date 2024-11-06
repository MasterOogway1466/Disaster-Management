require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./config/database');
const User = require('./models/User'); // Import User model
const Admin = require('./models/Admin'); // Import Admin model
// Middleware to parse JSON requests
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/disasters', disasterRoutes);
app.use('/api', adminRoutes);



// // Test route to add a sample user
// app.get('/test-user', async (req, res) => {
//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ where: { Username: 'johndoe' } });
//         if (existingUser) {
//             return res.json({ message: 'User already exists', user: existingUser });
//         }

//         // Create a new user if not exists
//         const user = await User.create({
//             First_name: 'John',
//             Last_name: 'Doe',
//             Username: 'johndoe',
//             Email: 'johndoe@example.com',
//             Phone_number: '1234567890',
//             password: 'hashedpassword', // Replace with hashed password in production
//             DOB: '1990-01-01'
//         });
//         res.json({ message: 'User created successfully', user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// });

// Sync database and start the server
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

sequelize.sync({ force: false }) // Set to true only if you want to recreate tables
  .then(() => console.log('Database & tables created!'))
  .catch((error) => console.error('Error creating database tables:', error));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
