import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState('');
  const isAdmin = !!localStorage.getItem('adminToken'); 

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // Admin token required for access
        if (!token) {
          setError('Unauthorized access');
          return;
        }

        const response = await axios.get('/api/volunteers/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setVolunteers(response.data);
      } catch (error) {
        setError('Failed to fetch volunteers');
      }
    };

    fetchVolunteers();
  }, []);

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
          </ul>
        </nav>
        <nav className="Logout">
          <b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>
          <b><Link to="/logout" className='logout-link'>Logout</Link></b>
        </nav>
      </header>

      <div className="container">
        <h1>Volunteers Page</h1>
        {error && <p>{error}</p>}
        <ul>
          {volunteers.map((volunteer) => (
            <li key={volunteer.Volunteer_ID}>
              <p><strong>{volunteer.first_name} {volunteer.last_name}</strong></p>
              <p>Email: {volunteer.email}</p>
              <p>Phone: {volunteer.phone_number}</p>
              {volunteer.appliedDisaster ? (
                <p>Applied Disaster: {volunteer.appliedDisaster.name} ({volunteer.appliedDisaster.disasterType})</p>
              ) : (
                <p>No disaster application found</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <p>© 2024 NGO Disaster Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Volunteers;
