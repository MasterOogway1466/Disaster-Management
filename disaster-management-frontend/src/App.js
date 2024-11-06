// src/App.js
import React from 'react';
import './styles/Style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import Volunteers from './components/Volunteers';
import Disasters from './components/Disasters';
import Training from './components/Training';
import ApplyVolunteer from './components/ApplyVolunteer';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import { Navigate } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/volunteers" element={<ProtectedRoute><Volunteers /></ProtectedRoute>} />
        <Route path="/disasters" element={<ProtectedRoute><Disasters /></ProtectedRoute>} />
        <Route path="/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
        <Route path="/apply-volunteer" element={<ProtectedRoute><ApplyVolunteer /></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
