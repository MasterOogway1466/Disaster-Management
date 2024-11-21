// src/components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
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
      const response = await axios.post('/api/admin-login', formData);

      if (response.data.clearUserToken) {
        // Clear the user token from local storage
        localStorage.removeItem('token');
      }
      
      localStorage.setItem('adminToken', response.data.token); // Store admin token in localStorage
      setMessage('Login successful');
      navigate('/'); // Redirect to the home page or admin dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
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
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <div><input type="password" name="password" placeholder="Password" onChange={handleChange} required /></div>
        <button type="submit" style={{marginTop:"5px"}}>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>

    <footer>
        <p>© 2024 NGO Disaster Management System.</p>
    </footer>

    </div>
  );
};

export default AdminLogin;
