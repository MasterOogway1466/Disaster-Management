// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
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
      const response = await axios.post('/auth/login', formData);

      if (response.data.clearAdminToken) {
        // Clear the user token from local storage
        localStorage.removeItem('adminToken');
      }
      localStorage.setItem('token', response.data.token); // Save JWT token to localStorage
      setTimeout(() => navigate('/'), 200); // Redirect after 1 second
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  const goToRegister = () => {
    navigate('/register');
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={goToRegister} className="nav-reg-btn" style={{marginTop:"-10px"}}>Register</button> {/* Navigate to register page */}
    </div>

    <footer>
        <p>© 2024 NGO Disaster Management System.</p>
    </footer>

    </div>
  );
};

export default Login;
