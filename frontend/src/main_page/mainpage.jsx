import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const MainPage = () => {
    return (
        <div>
            <h1>Welcome To The Post Office System</h1>
            <div>
                <Button variant="primary" as={Link} to={"/customer_login"}>Customer signs in here</Button>
            </div>
            <div>
                <Button variant="primary" as={Link} to={"/customer_signup"}>Or click here to sign up</Button>
            </div>
            <div>
                <Button variant="primary" as={Link} to={"/employee_login"}>Employee signs in here</Button>
            </div>
            <div></div>
            <div>
                <Button variant="primary" as={Link} to={"/create_package"}>Creating your own package!</Button>
            </div>
        </div>
    );
}

export default MainPage;