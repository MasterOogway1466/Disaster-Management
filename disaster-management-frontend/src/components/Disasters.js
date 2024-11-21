import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisasterAdd from './DisasterAdd'; // Component for adding disasters
import { Link } from 'react-router-dom';


const Disasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [error, setError] = useState('');
  const [applyMessage, setApplyMessage] = useState('');
  const isAdmin = !!localStorage.getItem('adminToken'); 

  useEffect(() => {
    // Fetch disasters from the backend
    const fetchDisasters = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
        const response = await axios.get('/api/disasters', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Disaster data response:", response.data);

        if (Array.isArray(response.data.disasters)) {
          setDisasters(response.data.disasters);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        setError('Failed to fetch disasters');
      }
    };

    fetchDisasters();
  }, []);

  // Handle volunteer application for a specific disaster
  const handleApply = async (disasterId) => {
    try {
      const token = localStorage.getItem('token'); // Only volunteers (not admins) should apply
      if (!token) {
        setApplyMessage('You need to log in as a volunteer to apply.');
        return;
      }

      const response = await axios.post(
        `/api/disasters/${disasterId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplyMessage(response.data.message || 'Applied successfully');
    } catch (error) {
      setApplyMessage(error.response?.data?.message || 'Failed to apply');
    }
  };

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
    
      <div className="container" style={{ width: '70%', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
  <h2>Existing Disasters</h2>
  {error && <p style={{ color: 'red' }}>{error}</p>}
  {applyMessage && <p style={{ color: 'red' }}>{applyMessage}</p>}
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  {disasters.length > 0 && (
    <thead>
      <tr>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Severity</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
      </tr>
    </thead>
  )}
    <tbody>
      {Array.isArray(disasters) ? (
        disasters.map((disaster) => (
          <tr key={disaster.Disaster_ID}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>{disaster.name}</strong></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{disaster.location}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{disaster.disasterType}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{disaster.severity}</td>
            {!isAdmin && (
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleApply(disaster.Disaster_ID)}>Apply to Volunteer</button>
              </td>
            )}
            {isAdmin && (
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button style={{ backgroundColor:"rgb(208, 65, 65)" }} onClick={() => handleApply(disaster.Disaster_ID)}>Delete</button>
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={isAdmin ? 4 : 5} style={{ textAlign: 'center', padding: '8px' }}>No disasters available to display</td>
        </tr>
      )}
    </tbody>
  </table>



      {/* Show DisasterAdd form if user is admin */}
      {localStorage.getItem('adminToken') && <DisasterAdd />}
    </div>
    <footer>
        <p>© 2024 NGO Disaster Management System.</p>
      </footer>
    </div>
  );
};

export default Disasters;
