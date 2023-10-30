import React, { useState } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const ManagerEmployeeHour = () => {
    const [employees_id, setEmployeeId] = useState('');
    const [workHours, setWorkHours] = useState([]); // <-- New state variable for working hours
    const getHours = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const employeeId = {
            employees_id
        };
        
        try {
            const response = await axios.post('http://localhost:3000/manager_check_working_hours', employeeId, { headers: { 'Authorization': `Bearer ${token}` }});
            if(!response.data.message){
                setWorkHours(response.data);
            }
            else{
                setWorkHours([]);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('There was an error with the information:', error);
            console.log(error.response);
        }
    };

    return(
        <Container className="mt-5">
            <Form onSubmit={getHours}>
                <Form.Group className="mb-4">
                    <Form.Label>Enter Employee ID</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Employee ID" 
                        value={employees_id} 
                        onChange={(e) => setEmployeeId(e.target.value)} 
                    />
                </Form.Group>
                <Button type="submit">Get Hours</Button>
            </Form>

            <h3 className="mt-4">Employee ID: {employees_id}</h3>

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
    )
}

export default ManagerEmployeeHour;