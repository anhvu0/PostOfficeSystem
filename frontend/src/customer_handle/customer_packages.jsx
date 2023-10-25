import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
  // Step 2: Initialize state
  const [tableData, setTableData] = useState([]);

  // Step 1: Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); //This is where you get the token from localStorage
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

  // Step 3: Render table
  return (
    <table style={{ borderCollapse: 'separate', borderSpacing: '15px', border: '1px solid black' }}>
    <thead>
        <tr>
        <th style={{ border: '1px solid black' }}>Package ID</th>
        <th style={{ border: '1px solid black' }}>Sender</th>
        <th style={{ border: '1px solid black' }}>Receiver</th>
        <th style={{ border: '1px solid black' }}>Status</th>
        </tr>
    </thead>
      <tbody>
        {tableData.map((tableData) => (
          <tr key={tableData.packages_id}>
            <td>{tableData.packages_id}</td>
            <td>{tableData.sender}</td>
            <td>{tableData.receiver}</td>
            <td>{tableData.package_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;