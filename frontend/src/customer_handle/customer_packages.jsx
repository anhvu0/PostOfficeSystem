import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTable.css';  // Importing the CSS

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/customer_packages', {headers : {'Authorization': `Bearer ${token}`}})
        if(!response.data.message){
            setTableData(response.data);
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
            <th>Package ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.packages_id}>
              <td>{row.packages_id}</td>
              <td>{row.sender}</td>
              <td>{row.receiver}</td>
              <td>{row.package_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
