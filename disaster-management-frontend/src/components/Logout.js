// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('adminToken'); // Clear admin token from localStorage
    navigate('/login'); // Redirect to login page
  }, [navigate]);

  return (
    <div className="container">
      <h1>Logged Out</h1>
      <p>You have been logged out successfully.</p>
    </div>
  );
};

export default Logout;
