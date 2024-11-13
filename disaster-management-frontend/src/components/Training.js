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
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/disasters">Disasters</Link></li>
            <li><Link to="/training">Training</Link></li>
            <li><Link to="/apply-volunteer">Apply as Volunteer</Link></li>
          </ul>
        </nav>
        <nav className="Logout">
          <b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>
          <b><Link to="/logout" className='logout-link'>Logout</Link></b>
        </nav>
      </header>
      <div className="container">
        <h1>Training Sessions</h1>
        {message && <p>{message}</p>}

        <h2>Available Sessions</h2>
        <ul>
          {sessions.map(session => (
            <li key={session.session_ID}>
            <strong>Session Name:</strong> {session.session_name} <br />
            <strong>Date:</strong> {formatDate(session.Date)} <br />
            <strong>Validity:</strong> {session.Validity} months <br />
            <strong>Conducted by:</strong> {session.ConductedByVolunteer?.first_name} {session.ConductedByVolunteer?.last_name} <br />
              {!isAdmin && (
                <button onClick={() => registerForSession(session.session_ID)}>Register</button>
              )}
            </li>
          ))}
        </ul>


        {isAdmin && (
          <div>
            <h2>Create New Session</h2>
            <form onSubmit={handleCreateSession}>
              <div>
                <label htmlFor="session_name">Session Name:</label>
                <input
                  type="text" // Change input type to text for session name
                  id="session_name"
                  name="session_name"
                  placeholder="Enter session name"
                  onChange={(e) => setNewSession({ ...newSession, session_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="Date">Session Date:</label>
                <input
                  type="date"
                  id="Date"
                  name="Date"
                  onChange={(e) => setNewSession({ ...newSession, Date: e.target.value })}
                  required
                />
              </div>

              <div>
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

              <div>
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

              <button type="submit">Create Session</button>
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
