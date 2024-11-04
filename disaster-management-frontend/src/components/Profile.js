// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to format the date as DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          setError('User is not authenticated');
          return;
        }

        const response = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` } // Include token in headers
        });

        setUserData(response.data);
      } catch (err) {
        setError('Failed to get user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p><strong>First Name:</strong> {userData.first_name}</p>
          <p><strong>Last Name:</strong> {userData.last_name}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone Number:</strong> {userData.phone_number}</p>
          <p><strong>Date of Birth:</strong> {formatDate(userData.dob)}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
