// src/components/Training.js
import React from 'react';
import { Link } from 'react-router-dom';

const Training = () => {
  return (
    <div>
    <header>
        <nav className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/disasters">Disasters</Link></li>
            <li><Link to="/training">Training</Link></li>
            <li><Link to="/apply-volunteer">Apply as Volunteer</Link></li>
          </ul>
        </nav>
        <nav className="Logout">
          <b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>
          <b><Link to="/logout" style={{ color: 'white' }}>Logout</Link></b>
        </nav>
      </header>

    <div className="container">
      <h1>Training Sessions</h1>
      <p>This page will display available training sessions for volunteers.</p>
    </div>

    <footer>
        <p>© 2024 NGO Disaster Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Training;
