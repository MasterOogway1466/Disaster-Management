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
        <div><input type="text" style={{width:"50%"}} name="name" placeholder="Disaster Name" onChange={handleChange} required /></div>
        <div><input type="text" style={{width:"50%"}}name="disasterType" placeholder="Disaster Type" onChange={handleChange} required /></div>
        <div><input type="text" style={{width:"50%"}}name="location" placeholder="Location" onChange={handleChange} required /></div>
        
        <label>Severity:</label>
        <select name="severity" value={formData.severity} onChange={handleChange} required>
          <option>--select--</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <label>Start Date:</label>
        <div> <input type="date" name="startDate" onChange={handleChange} required /></div>
        <button type="submit" style={{width:"25%", marginTop:"10px"}} >Add Disaster</button>
      </form>
    </div>
  );
};

export default DisasterAdd;
