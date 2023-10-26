import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


const ELoginForm = () => {

    const navigate = useNavigate(); // useNavigate hook to navigate to other pages

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password
    };

    // Axios POST request
    await axios.post('http://localhost:3000/employee_login', loginData)
      .then((response) => {
        if (response.data.status === true){
            localStorage.setItem('token', response.data.token); // store token in local storage
            alert(response.data.message);
            navigate('/employee_mainpage'); // navigate to customer_mainpage
        }
        else{
            alert("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Login" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ELoginForm;