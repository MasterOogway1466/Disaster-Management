import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VolunteerFeedback = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [message, setMessage] = useState('');
  const isAdmin = !!localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('/api/volunteers/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVolunteers(response.data);
      } catch (error) {
        setMessage('Failed to fetch volunteers');
      }
    };

    fetchVolunteers();
  }, []);

  const handleFeedbackChange = (volunteerId, disasterId, value) => {
    setFeedback({ ...feedback, [`${volunteerId}-${disasterId}`]: value });
  };

  const submitFeedback = async (volunteerId, disasterId) => {
    const feedbackText = feedback[`${volunteerId}-${disasterId}`];
    console.log('Submitting feedback:', {
        Volunteer_ID: volunteerId,
        Disaster_ID: disasterId,
        Feedback: feedbackText,
      });
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(
        '/api/history/add-feedback',
        { Volunteer_ID: volunteerId, Disaster_ID: disasterId, Feedback: feedbackText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage('Feedback submitted successfully');
    } catch (error) {
      setMessage('Failed to submit feedback');
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
            {isAdmin && (<li><Link to="/get-volunteer-history">Get Volunteer History</Link></li>)}
          </ul>
        </nav>
        <nav className="Logout">
          {!isAdmin && (<b><Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link></b>)}
          <b><Link to="/logout" className="logout-link">Logout</Link></b>
        </nav>
      </header>

      <div className="container" style={{ width: '70%', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Volunteer Feedback</h2>
        {message && <p>{message}</p>}

      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Volunteer Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Disaster Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Feedback</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            volunteer.appliedDisaster ? (
              <tr key={volunteer.Volunteer_ID}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{volunteer.first_name} {volunteer.last_name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{volunteer.appliedDisaster.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <textarea
                    value={feedback[`${volunteer.Volunteer_ID}-${volunteer.Disaster_ID}`] || ''}
                    onChange={(e) => handleFeedbackChange(volunteer.Volunteer_ID, volunteer.Disaster_ID, e.target.value)}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <button onClick={() => submitFeedback(volunteer.Volunteer_ID, volunteer.Disaster_ID)}>Submit</button>
                </td>
              </tr>
            ) : (
              <tr key={volunteer.Volunteer_ID}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{volunteer.first_name} {volunteer.last_name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>No Disaster Assigned</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Not Applicable</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>--</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>

    <footer>
        <p>© 2024 NGO Disaster Management System.</p>
    </footer>
    
    </div>
  );
};

export default VolunteerFeedback;
