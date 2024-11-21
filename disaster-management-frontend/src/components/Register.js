// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    dob: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', formData);
      alert(response.data.message);

      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
       <header>
        <nav className="nav-links">
        </nav>
        <nav className="Logout">
          <b><Link to="/admin-login" style={{ color: '#00395f', marginRight: '15px'  }}>Admin</Link></b>
          <b><Link to="/login" style={{ color: 'white' }}>User - Login</Link></b>
        </nav>
      </header>
    <div className="container">
      <h2>Register</h2>
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
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
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
            pattern="[0-9]{10}"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Date of Birth (Can't be changed later!)</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-btn">Register</button>
      </form>
      <p>Already have an account?</p>
      <button onClick={goToLogin} className="nav-login-btn">Go to Login</button> 
    </div>

    <footer>
        <p>© 2024 NGO Disaster Management System. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default Register;
