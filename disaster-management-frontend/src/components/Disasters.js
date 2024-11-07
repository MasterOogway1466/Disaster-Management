import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisasterAdd from './DisasterAdd'; // Component for adding disasters

const Disasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [error, setError] = useState('');
  const [applyMessage, setApplyMessage] = useState('');

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
    <div className="container">
      <h2>Existing Disasters</h2>
      {error && <p>{error}</p>}
      {applyMessage && <p>{applyMessage}</p>}
      <ul>
        {Array.isArray(disasters) ? (
          disasters.map((disaster) => (
            <li key={disaster.Disaster_ID}>
              <strong>{disaster.name}</strong> - {disaster.location} ({disaster.disasterType}, Severity: {disaster.severity})
              <button onClick={() => handleApply(disaster.Disaster_ID)}>Apply to Volunteer</button>
            </li>
          ))
        ) : (
          <p>No disasters available to display</p>
        )}
      </ul>

      {/* Show DisasterAdd form if user is admin */}
      {localStorage.getItem('adminToken') && <DisasterAdd />}
    </div>
  );
};

export default Disasters;
