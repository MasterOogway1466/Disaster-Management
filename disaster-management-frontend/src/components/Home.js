// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
          <b><Link to="/logout" style={{ color: 'white' }}>Logout</Link></b>
        </nav>
      </header>

      <div className="home-container">
        <h1>Welcome to the NGO Disaster Management System</h1>
        <p>This system helps NGOs manage volunteers and assign them to relevant disasters.</p>
        <p>Explore the features by navigating through the menu.</p>
      </div>

      <footer>
        <p>© 2024 NGO Disaster Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
