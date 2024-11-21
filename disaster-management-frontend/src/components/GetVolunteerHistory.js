import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetVolunteerHistory = () => {
    const [volunteerId, setVolunteerId] = useState('');
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const isAdmin = !!localStorage.getItem('adminToken');

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
          <b><Link to="/logout" className='logout-link'>Logout</Link></b>
        </nav>
      </header>

        <div className="container" style={{ width: '70%', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Get Volunteer History</h2>
            <input
                type="text"
                value={volunteerId}
                onChange={(e) => setVolunteerId(e.target.value)}
                placeholder="Enter Volunteer ID"
                style={{ padding: '8px', width:'60%'}}
            />
            <button onClick={fetchHistory} style={{ padding: '8px', marginTop:"5px", cursor: 'pointer' , width:'60%'}}>
                Get History
            </button>
            {message && <p>{message}</p>}

            {history.length > 0 && (
                <table border="1" style={{ marginTop: '20px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
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

        <footer>
        <p>© 2024 NGO Disaster Management System.</p>
        </footer>

        </div>
    );
};

export default GetVolunteerHistory;
