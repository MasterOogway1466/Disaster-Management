// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const isAdmin = !!localStorage.getItem('adminToken');
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User is not authenticated');
          return;
        }

        // Fetch user profile data
        const response = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setFormData(response.data);

        // Check if the user is a volunteer
        checkIfVolunteer(response.data.User_ID);
      } catch (err) {
        setError('Failed to get user data');
      }
    };

    const checkIfVolunteer = async (userId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/volunteers/check/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsVolunteer(response.data.isVolunteer);
        fetchVolunteerHistory(userId);
      } catch (err) {
        console.error('Error checking volunteer status:', err);
        setIsVolunteer(false);
      }
    };

    const fetchVolunteerHistory = async (userId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/history/history/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVolunteerHistory(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Failed to fetch volunteer history:', err);
        setVolunteerHistory([]);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const transformedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key.charAt(0).toUpperCase() + key.slice(1),
          value,
        ])
      );

      // Send transformed data to backend
      await axios.put('/auth/profile', transformedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      setError(null);
      window.location.reload();
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const deleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('/auth/delete-account', {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.clear(); // Clear token from storage
        navigate('/login'); // Redirect to registration after deletion
      } catch (error) {
        setError('Failed to delete account');
      }
    }
  };

  if (error) return <p>{error}</p>;

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
            {isAdmin && (<li><Link to="/get-volunteer-history">Get Volunteer History</Link></li>)}
          </ul>
        </nav>
        <nav className="Logout">
          <b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>
          <b><Link to="/logout" className='logout-link'>Logout</Link></b>
        </nav>
      </header>

      <div style={styles.container}>
        {userData ? (
          <div style={styles.profileCard}>
            <center><h2 style={styles.heading}>Profile</h2></center>
          {!isEditing ? (
            <>
              <p><strong>First Name:</strong> {userData.first_name}</p>
              <p><strong>Last Name:</strong> {userData.last_name}</p>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone Number:</strong> {userData.phone_number}</p>
              <p><strong>Date of Birth:</strong> {formatDate(userData.dob)}</p>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button style={styles.editButton} onClick={handleEditClick}>Edit Profile</button>
                <button style={styles.deleteButton} onClick={deleteAccount}>Delete Account</button>
              </div>
            </>
          ) : (
            <div style={styles.editForm}>
              <label>First Name: <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} /></label>
              <label>Last Name: <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} /></label>
              <label>Username: <input type="text" name="username" value={formData.username} onChange={handleChange} /></label>
              <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
              <label>Phone Number: <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} /></label>
              <button style={styles.saveButton} onClick={handleSave}>Save Changes</button>
            </div>
          )}
        </div>
        
        ) : (
          <p>Loading profile...</p>
        )}

      </div>
      
      <div className='container' style={{ backgroundColor:"#f8f9fa",padding: '8px', marginTop:"0px", cursor: 'pointer' , width:'40%'}}>
      <center>
      {isVolunteer && (
          <div style={styles.historySection}>
            <h2>History</h2>
            <center>
            {volunteerHistory.length > 0 ? (
              <table style={{ borderCollapse: 'collapse', marginBottom:"5px" }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Disaster Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Severity</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteerHistory.map((record) => (
                    <tr key={record.History_ID}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.Disaster_Name || 'N/A'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.Disaster_Location || 'N/A'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.Disaster_Type || 'N/A'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.Disaster_Severity || 'N/A'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.Feedback || 'No feedback available'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No history available</p>
            )}
            </center>
          </div>
        )}
      </center>
      </div>
      <footer>
        <p>© 2024 NGO Disaster Management System. All rights reserved.</p>
      </footer>
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
  historySection: {
    marginTop: '30px',
    width: '80%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    // marginTop: '20px',
  },
  editButton: {
    padding: '8px 10px',
    fontSize: '16px',
    marginRight: '10px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '8px 10px',
    fontSize: '16px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Profile;
