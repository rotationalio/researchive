import axios from 'axios';
import { Layers } from 'react-feather';
import React, { useState, useEffect } from 'react';

// Status fetches the current API status and displays it.
const Status = () => {
  const [status, setStatus] = useState({timestamp: '', status: '', version: ''});

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await axios.get("http://localhost:8000/status")
      setStatus(data);
    }
    fetchStatus();
  }, [])

  const color = status.status === "ok" ? "#198754" : "#dc3545";

  return (
    <>
    <li className="nav-item">
      <a className="nav-link"
         title={`Status: ${status.status}, Last updated: ${status.timestamp}`}
         href="http://localhost:8000/docs"
      >
        <Layers color={color} className="feather" />
        API v{status.version} Docs
      </a>
    </li>
    </>
  );
}

export default Status;