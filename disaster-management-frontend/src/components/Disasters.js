import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisasterAdd from './DisasterAdd'; // Component for adding disasters

const Disasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch disasters from the backend
    const fetchDisasters = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
        const response = await axios.get('/api/disasters', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log the response to inspect its structure
        console.log("Disaster data response:", response.data);

        // Check if response.data is an array; if so, update `disasters`
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

  return (
    <div className="container">
      <h2>Existing Disasters</h2>
      {error && <p>{error}</p>}
      <ul>
        {/* Add conditional check to ensure disasters is an array before mapping */}
        {Array.isArray(disasters) ? (
          disasters.map((disaster) => (
            <li key={disaster.Disaster_ID}>
              <strong>{disaster.name}</strong> - {disaster.location} ({disaster.disasterType}, Severity: {disaster.severity})
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
