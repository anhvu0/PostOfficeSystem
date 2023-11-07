import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeRegistrationForm = () => {

  const navigate = useNavigate();

  const [EFname, setEFname] = useState('');
  const [ELname, setELname] = useState('');
  const [employees_ssn, setEmployeesSSN] = useState('');
  const [e_username, setEUsername] = useState('');
  const [e_password, setEPassword] = useState('');
  const [location_name, setLocationName] = useState('');
  const [e_role, setERole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      EFname,
      ELname,
      employees_ssn,
      e_username,
      e_password,
      location_name,
      e_role
    };

    axios.post('http://52.14.150.221:3000/employee_signup', registrationData)
      .then((response) => {
        alert(response.data.message);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Employee Register</h5>
              <form onSubmit={handleSubmit}>
                {/* Adapted Fields for Employee Registration */}
                <div className="form-group">
                  <label htmlFor="EFname">First Name</label>
                  <input type="text" className="form-control" id="EFname" placeholder="First Name" value={EFname} onChange={(e) => setEFname(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="ELname">Last Name</label>
                  <input type="text" className="form-control" id="ELname" placeholder="Last Name" value={ELname} onChange={(e) => setELname(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="employees_ssn">SSN</label>
                  <input type="text" className="form-control" id="employees_ssn" placeholder="SSN" value={employees_ssn} onChange={(e) => setEmployeesSSN(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="e_username">Username</label>
                  <input type="text" className="form-control" id="e_username" placeholder="Username" value={e_username} onChange={(e) => setEUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="e_password">Password</label>
                  <input type="password" className="form-control" id="e_password" placeholder="Password" value={e_password} onChange={(e) => setEPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="location_name">Location Name</label>
                  <input type="text" className="form-control" id="location_name" placeholder="Location Name" value={location_name} onChange={(e) => setLocationName(e.target.value)} required />
                </div>
                <div className="form-group">
                <label htmlFor="e_role">Role</label>
                <select className="form-control" id="e_role" value={e_role} onChange={(e) => setERole(e.target.value)} required>
                    <option value="" disabled>Select role</option>
                    <option value="MGR">MGR (Manager)</option>
                    <option value="CLK">CLK (Clerk)</option>
                    <option value="DEL">Delievery (DEL)</option>
                    {/* Add more options as needed */}
                </select>
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm;
