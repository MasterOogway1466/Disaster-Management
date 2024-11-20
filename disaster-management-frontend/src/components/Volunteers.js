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
        {!isAdmin && (<b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>)}
          <b><Link to="/logout" className='logout-link'>Logout</Link></b>
        </nav>
      </header>

  <div className="container"style={{ width: '70%', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
    <h1 style={{color:"Black"}}>Volunteers Page</h1>
    {error && <p>{error}</p>}
  <center>
    <table style={{ width: '80%', borderCollapse: 'collapse' }}>
  {volunteers.length > 0 && (
    <thead>
      <tr>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Applied Disaster</th>
      </tr>
    </thead>
  )}
<tbody>
  {volunteers.length > 0 ? (
    volunteers.map((volunteer) => (
      <tr key={volunteer.Volunteer_ID}>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
          <strong>{volunteer.first_name} {volunteer.last_name}</strong>
        </td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
          {volunteer.email}
        </td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
          {volunteer.phone_number}
        </td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
          {volunteer.appliedDisaster ? (
            `${volunteer.appliedDisaster.name} (${volunteer.appliedDisaster.disasterType})`
          ) : (
            'No disaster application found'
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} style={{ textAlign: 'center', padding: '8px' }}>
        No volunteers available to display
      </td>
    </tr>
  )}
</tbody>

</table>
</center>
      </div>
      <footer>
        <p>© 2024 NGO Disaster Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Volunteers;
