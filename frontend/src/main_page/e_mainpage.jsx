import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EmployeeMainPage = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [packageStatus, setPackageStatus] = useState('');  // State to store package status

  const handleAssign = async () => {
    const token = localStorage.getItem('token');
    const payload = {
        trackingNumber,
        packageStatus  // Include packageStatus in the payload
    };
    
    try {
        const response = await axios.post('http://localhost:3000/employee_mainpage', payload, { headers: { 'Authorization': `Bearer ${token}` }});
        alert(response.data.message);
    } catch (error) {
        console.error('There was an error with the assignment:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Welcome Back</h1>
      <div className="mb-4">
        <Button variant="primary" as={Link} to={"/packages"}>Click here to check for existing packages in all system</Button>
      </div>

      <Form.Group className="mb-4">
        <Form.Label>Enter Tracking Number</Form.Label>
        <Form.Control type="number" placeholder="Tracking Number" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Enter Package Status</Form.Label>
        <Form.Control type="text" placeholder="Package Status" value={packageStatus} onChange={(e) => setPackageStatus(e.target.value)} />
      </Form.Group>

      <Button variant="success" onClick={handleAssign}>Assign</Button>
    </div>
  );
}

export default EmployeeMainPage;
