import axios from 'axios';
import React, { useState, useEffect } from 'react';

const statusStyle = {
  cursor: 'help'
}

// Status fetches the current API status and displays it.
const Status = () => {
  const [status, setStatus] = useState({timestamp: '', status: '', version: ''});

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await axios.get("http://localhost:8000/")
      setStatus(data);
    }
    fetchStatus();
  }, [])

  return (
    <span id="api-status" title={`Status: ${status.status}, Last updated: ${status.timestamp}`} style={statusStyle}>
      <i className={`fas fa-circle ${status.status == 'ok' ? 'text-success' : 'text-danger'}`}></i>{' '}
      <span className="p-1">Using Researchive API v{status.version}</span>
    </span>
  );
}

export default Status;