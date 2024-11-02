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


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/disasters" element={<Disasters />} />
        <Route path="/training" element={<Training />} />
        <Route path="/apply-volunteer" element={<ApplyVolunteer />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
