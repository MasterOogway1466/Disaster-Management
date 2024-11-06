// src/components/AdminRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    First_name: '',
    Last_name: '',
    email: '',
    phone_number: '',
    password: ''
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
      const response = await axios.post('/api/admin-register', formData);
      setMessage(response.data.message || 'Registration successful');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="First_name" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="Last_name" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="tel" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register as Admin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminRegister;
