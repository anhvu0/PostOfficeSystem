import React, { useState, useEffect } from 'react';
import {Container, Table } from 'react-bootstrap';
import axios from 'axios';

const GetEmployeeHour = () => {
  const [workHours, setWorkHours] = useState([]); // <-- New state variable for working hours

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get('http://localhost:3000/employee_check_working_hours', { headers: { 'Authorization': `Bearer ${token}` }});
        
        if (!response.data.message) {
          setWorkHours(response.data);
        } else {
          setWorkHours([]);
          alert(response.data.message);
        }
      } catch (error) {
        console.error('There was an error with the information:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>In Hour</th>
            <th>Out Hour</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {workHours.map((hour, index) => (
            <tr key={index}>
              <td>{new Date(hour.working_date).toLocaleString()}</td>
              <td>{hour.in_hour}</td>
              <td>{hour.out_hour}</td>
              <td>{hour.total_hour}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetEmployeeHour;
