// src/components/ApplyVolunteer.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ApplyVolunteer = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    DOB: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming the user is logged in
      const response = await axios.post('/api/volunteers/volunteer-register', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message || 'Registration successful');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div>
    <header>
        <nav className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/disasters">Disasters</Link></li>
            <li><Link to="/training">Training</Link></li>
            <li><Link to="/apply-volunteer">Apply as Volunteer</Link></li>
          </ul>
        </nav>
        <nav className="Logout">
          <b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>
          <b><Link to="/logout" style={{ color: 'white' }}>Logout</Link></b>
        </nav>
      </header>

    <div className="container">
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-btn">Register as Volunteer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    
    <footer>
        <p>© 2024 NGO Disaster Management System. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default ApplyVolunteer;
