import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../customer_handle/DataTable.css';

const AllEmployee = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all_employee');
        if(!response.data.message){
            setTableData(response.data);
	    console.log(response.data);
        }
      } catch (error) {
        console.error("There was an issue fetching the data: ", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Employee ID</th>
            <th>Employee SSN</th>
            <th>First name</th>
            <th>Last name</th>
            <th>E username</th>
            <th>E password</th>
            <th>Location ID</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.employees_id}>
              <td>{row.employees_id}</td>
              <td>{row.employees_ssn}</td>
              <td>{row.EFname}</td>
              <td>{row.ELname}</td>
              <td>{row.e_username}</td>
              <td>{row.e_password}</td>
              <td>{row.location_id}</td>
              <td>{row.e_role}</td> {/* New column */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployee;
