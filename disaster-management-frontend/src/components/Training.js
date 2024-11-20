// src/components/Training.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


// Helper function to format the date as DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Training = () => {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch training sessions on component mount
  useEffect(() => {
    const fetchSessions = async () => {
      setIsAdmin(!!localStorage.getItem('adminToken')); // Check if logged in as admin
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
        const response = await axios.get('/api/training', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSessions(response.data);
      } catch (error) {
        setMessage('Failed to fetch training sessions');
      }
    };

    fetchSessions();
  }, []);

  // Volunteer registration for a session
  const registerForSession = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/training/register',
        { Session_ID: sessionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message || 'Successfully registered for session');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to register');
    }
  };

  // Form submission for creating a new session
  const [newSession, setNewSession] = useState({ session_name:'', Date: '', Validity: '', Conducted_by: '' });
  const handleCreateSession = async (e) => {
    e.preventDefault();
    console.log(newSession);
    try {
      const token = localStorage.getItem('adminToken'); // Ensure that you have the admin token available
      if (!token) {
        alert('Admin not authenticated');
        return;
      }
      const response = await axios.post(
        'http://localhost:3001/api/training/create',
        {
          session_name: newSession.session_name,
          Date: newSession.Date,
          Validity: newSession.Validity,
          Conducted_by: newSession.Conducted_by,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Handle success response
      setMessage(response.data.message || 'Session created successfully');
      // Optionally, clear the form or reset state

      setNewSession({ session_name: '', Date: '', Validity: '', Conducted_by: '' });
      window.location.reload();
    } catch (error) {
      console.error('Error creating session:', error);
      setMessage(error.response?.data?.message || 'Failed to create session');
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
        <h1 style={{ color:"black"}}>Training Sessions</h1>
        {message && <p>{message}</p>}
  <h2>Available Sessions</h2>
  <center>
  <table style={{ borderCollapse: 'collapse' }}>
  {sessions.length > 0 && (
    <thead>
      <tr>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Session Name</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Validity (months)</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Conducted By</th>
        {!isAdmin && <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>}
      </tr>
    </thead>
  )}
    <tbody>
      {sessions.length > 0 ? (
        sessions.map(session => (
          <tr key={session.session_ID}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>{session.session_name}</strong></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatDate(session.Date)}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{session.Validity}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {session.ConductedByVolunteer?.first_name} {session.ConductedByVolunteer?.last_name}
            </td>
            {!isAdmin && (
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => registerForSession(session.session_ID)}>Register</button>
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={isAdmin ? 4 : 5} style={{ textAlign: 'center', padding: '8px' }}>No sessions available</td>
        </tr>
      )}
    </tbody>
  </table>
  </center>



        {isAdmin && (
          <div>
            <h2>Create New Session</h2>
            <form onSubmit={handleCreateSession}>
              <div>
                <label htmlFor="session_name">Session Name:</label>
                <input
                  type="text" // Change input type to text for session name
                  style={{width:"50%"}}
                  id="session_name"
                  name="session_name"
                  placeholder="Enter session name"
                  onChange={(e) => setNewSession({ ...newSession, session_name: e.target.value })}
                  required
                />
              </div>

              <div style={{marginTop:"10px"}}>
                <label htmlFor="Date">Session Date:</label>
                <input
                  type="date"
                  id="Date"
                  name="Date"
                  onChange={(e) => setNewSession({ ...newSession, Date: e.target.value })}
                  required
                />
              </div>

              <div style={{marginTop:"10px"}}>
                <label htmlFor="Validity">Validity (months):</label>
                <input
                  type="number"
                  id="Validity"
                  name="Validity"
                  placeholder="Validity (months)"
                  onChange={(e) => setNewSession({ ...newSession, Validity: e.target.value })}
                  required
                />
              </div>

              <div style={{marginTop:"10px"}}>
                <label htmlFor="Conducted_by">Conducted By (Volunteer ID):</label>
                <input
                  type="number"
                  id="Conducted_by"
                  name="Conducted_by"
                  placeholder="Conducted By (Volunteer ID)"
                  onChange={(e) => setNewSession({ ...newSession, Conducted_by: e.target.value })}
                  required
                />
              </div>

              <button type="submit" style={{width:"25%", marginTop:"10px"}}>Create Session</button>
            </form>
          </div>
        )}

      </div>
      <footer>
        <p>© 2024 NGO Disaster Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Training;
