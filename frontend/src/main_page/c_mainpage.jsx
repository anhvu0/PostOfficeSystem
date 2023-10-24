import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const MainPage = () => {
    return (
        <div>
            <h1>Welcome Back</h1>
            <div>
                <Button variant="primary" as={Link} to={"/customer_packages"}>Click here to check for your existing packages</Button>
            </div>
        </div>
    );
}

export default MainPage;