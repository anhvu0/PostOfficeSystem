import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const EmployeeMainPage = () => {
    return (
        <div>
            <h1>Welcome Back</h1>
            <div>
                <Button variant="primary" as={Link} to={"/packages"}>Click here to check for existing packages in all system</Button>
            </div>
        </div>
    );
}

export default EmployeeMainPage;