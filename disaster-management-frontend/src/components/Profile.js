// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Helper function to format the date as DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for routing

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
    <div style={styles.container}>
      <h2 style={styles.heading}>User Profile</h2>
      {userData ? (
        <div style={styles.profileCard}>
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
      <button style={styles.backButton} onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  profileCard: {
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f8f9fa',
    textAlign: 'left',
    marginBottom: '20px',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#2c3e50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: 'fit-content',
  }
};

export default Profile;
