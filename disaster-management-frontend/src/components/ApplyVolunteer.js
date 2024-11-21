// src/components/ApplyVolunteer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Helper function to format the date as DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


const ApplyVolunteer = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const isAdmin = !!localStorage.getItem('adminToken');

  // Fetch the logged-in user's information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          setMessage('User is not authenticated');
          return;
        }

        const response = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` } // Include token in headers
        });

        setUserData(response.data);
      } catch (error) {
        setMessage('Failed to retrieve user data');
      }
    };

    fetchUserData();
  }, []);

  // Handle "Apply as Volunteer" submission
  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/volunteers/volunteer-register', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message || 'Applied successfully as a volunteer');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to apply as volunteer');
    }
  };

  return (
    <div>
      <header>
        <nav className="nav-links">
         <ul>
            <li><Link to="/">Home</Link></li>
            {isAdmin && (<li><Link to="/volunteers">Volunteers</Link></li>)}
            <li><Link to="/disasters">Disasters</Link></li>
            <li><Link to="/training">Training</Link></li>
            {!isAdmin && (<li><Link to="/apply-volunteer">Apply as Volunteer</Link></li>)}
            {isAdmin && (<li><Link to="/volunteer-feedback">Volunteer feedback</Link></li>)}
          </ul>
        </nav>
        <nav className="Logout">
          <b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>
          <b><Link to="/logout" className='logout-link'>Logout</Link></b>
        </nav>
      </header>

      <div className="container">
        <h2>Volunteer Registration</h2>
        {userData ? (
          <div>
            <p><strong>First Name:</strong> {userData.first_name}</p>
            <p><strong>Last Name:</strong> {userData.last_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone Number:</strong> {userData.phone_number}</p>
            <p><strong>Date of Birth:</strong> {formatDate(userData.dob)}</p>
            <button onClick={handleApply} className="apply-btn">Apply as Volunteer</button>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
        {message && <p>{message}</p>}
      </div>

      <footer>
        <p>© 2024 NGO Disaster Management System.</p>
      </footer>
    </div>
  );
};

export default ApplyVolunteer;
