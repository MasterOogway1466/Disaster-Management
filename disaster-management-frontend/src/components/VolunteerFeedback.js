import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VolunteerFeedback = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // Ensure admin is logged in
        const response = await axios.get('/api/volunteers/list', {
          headers: { Authorization: `Bearer ${token}` }
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Feedback submitted successfully');
    } catch (error) {
      setMessage('Failed to submit feedback');
    }
  };

  return (
    <div className="container">
      <header>
        <nav className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/disasters">Disasters</Link></li>
            <li><Link to="/training">Training</Link></li>
          </ul>
        </nav>
      </header>

      <h2>Volunteer Feedback</h2>
      {message && <p>{message}</p>}

      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Volunteer Name</th>
            <th>Disaster Name</th>
            <th>Feedback</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            volunteer.appliedDisaster ? (
              <tr key={volunteer.Volunteer_ID}>
                <td>{volunteer.first_name} {volunteer.last_name}</td>
                <td>{volunteer.appliedDisaster.name}</td>
                <td>
                  <textarea
                    value={feedback[`${volunteer.Volunteer_ID}-${volunteer.Disaster_ID}`] || ''}
                    onChange={(e) => handleFeedbackChange(volunteer.Volunteer_ID, volunteer.Disaster_ID, e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => submitFeedback(volunteer.Volunteer_ID, volunteer.Disaster_ID)}>Submit</button>
                </td>
              </tr>
            ) : (
              <tr key={volunteer.Volunteer_ID}>
                <td>{volunteer.first_name} {volunteer.last_name}</td>
                <td>No Disaster Assigned</td>
                <td>Not Applicable</td>
                <td>--</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerFeedback;
