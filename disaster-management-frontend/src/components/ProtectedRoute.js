import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for either user token or admin token in localStorage
  const userToken = localStorage.getItem('token');  // Token for regular users
  const adminToken = localStorage.getItem('adminToken');  // Token for admins

  if (!userToken && !adminToken) {
    // If neither token exists, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If at least one token exists, render the child component
  return children;
};

export default ProtectedRoute;
