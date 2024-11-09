// src/components/ProtectedAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  // Check if an admin token exists in local storage
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    // If no admin token, redirect to the admin login page
    alert('Unauthorized access! Login as admin to access this page');
    return <Navigate to="/" replace />;
  }

  // If admin token exists, render the child component
  return children;
};

export default ProtectedAdminRoute;
