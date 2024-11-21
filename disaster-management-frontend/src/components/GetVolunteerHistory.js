import React, { useState } from 'react';
import axios from 'axios';

const GetVolunteerHistory = () => {
    const [volunteerId, setVolunteerId] = useState('');
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');

    const fetchHistory = async () => {
        try {
            if (!volunteerId || isNaN(volunteerId)) {
                setMessage('Please enter a valid Volunteer ID');
                return;
            }

            const token = localStorage.getItem('adminToken'); // Ensure admin is logged in
            const response = await axios.get(`/api/history/history/${volunteerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setHistory(response.data); // Update history data
            setMessage('');
        } catch (error) {
            setMessage('Failed to fetch volunteer history');
            console.error('Error fetching volunteer history:', error);
        }
    };

    return (
        <div className="container" style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>Get Volunteer History</h2>
            <input
                type="text"
                value={volunteerId}
                onChange={(e) => setVolunteerId(e.target.value)}
                placeholder="Enter Volunteer ID"
                style={{ padding: '8px', marginRight: '10px' }}
            />
            <button onClick={fetchHistory} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                Get History
            </button>
            {message && <p>{message}</p>}

            {history.length > 0 && (
                <table border="1" style={{ marginTop: '20px', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <thead>
                        <tr>
                            <th>History ID</th>
                            <th>Feedback</th>
                            <th>Volunteer Name</th>
                            <th>Disaster Name</th>
                            <th>Disaster Location</th>
                            <th>Disaster Type</th>
                            <th>Disaster Severity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((record) => (
                            <tr key={record.History_ID}>
                                <td>{record.History_ID}</td>
                                <td>{record.Feedback}</td>
                                <td>{`${record.Volunteer_FirstName} ${record.Volunteer_LastName}`}</td>
                                <td>{record.Disaster_Name}</td>
                                <td>{record.Disaster_Location}</td>
                                <td>{record.Disaster_Type}</td>
                                <td>{record.Disaster_Severity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GetVolunteerHistory;
