// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const isAdmin = !!localStorage.getItem('adminToken'); 
  return (
    <div>
      <header>
        <nav className="nav-links">
         <ul>
            <li><Link to="/">Home</Link></li>
            {isAdmin && (<li><Link to="/volunteers">Volunteers</Link></li>)}
            <li><Link to="/disasters">Disasters</Link></li>
            <li><Link to="/training">Training</Link></li>
            {!isAdmin && (<li><Link to="/apply-volunteer">Apply as Volunteer</Link></li>)}
            {isAdmin && (<li><Link to="/volunteer-feedback">Volunteer feedback</Link></li>)}
          </ul>
        </nav>
        <nav className="Logout">
          {!isAdmin && (<b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>)}
          <b><Link to="/logout" className='logout-link'>Logout</Link></b>
        </nav>
      </header>

      <div className="home-container">
        <h1 style={{backgroundColor: "grey", borderRadius: "10px", padding: "10px"}}>Welcome to the NGO Disaster Management System</h1>
        {!isAdmin && (
          <div>
          <p>This system helps NGOs manage volunteers and assign them to relevant disasters.</p>
          <p>Explore the features by navigating through the menu.</p>
          </div>
        )}
        {isAdmin && (
          <div>
          <p>Navigate the website to get insights about Volunteers and manage the Website</p>
          </div>
        )}
      </div>

      <footer>
        <p>© 2024 NGO Disaster Management System. </p>
      </footer>
    </div>
  );
};

export default Home;
