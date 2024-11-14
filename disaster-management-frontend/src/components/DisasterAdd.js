// src/components/DisasterAdd.js
import React, { useState } from 'react';
import axios from 'axios';

const DisasterAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    disasterType: '',
    location: '',
    severity: '',
    startDate: '',
  });
  const [message, setMessage] = useState('');
  const isAdmin = !!localStorage.getItem('adminToken');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setMessage('Not authorized');
        return;
      }

      const response = await axios.post('/api/disasters/add', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message || 'Disaster added successfully');
      window.location.reload();
    } catch (error) {
        console.log(error);
      setMessage(error.response?.data?.message || 'Failed to add disaster');
    }
  };

  return (
    <div>
      <h3>Add a New Disaster</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Disaster Name" onChange={handleChange} required />
        <input type="text" name="disasterType" placeholder="Disaster Type" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        
        <label>Severity:</label>
        <select name="severity" value={formData.severity} onChange={handleChange} required>
          <option>--select--</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <label>Start Date:</label>
        <input type="date" name="startDate" onChange={handleChange} required />

        <button type="submit">Add Disaster</button>
      </form>
    </div>
  );
};

export default DisasterAdd;
