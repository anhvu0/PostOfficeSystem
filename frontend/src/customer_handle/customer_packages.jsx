import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTable.css';  // Importing the CSS

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
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
            <th>From Address</th> {/* New column */}
            <th>To Address</th> {/* New column */}
            <th>Status</th>
            <th>Employee Handle ID</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.packages_id}>
              <td>{row.packages_id}</td>
              <td>{row.sender}</td>
              <td>{row.receiver}</td>
              <td>{row.from_address}</td> {/* New column */}
              <td>{row.to_address}</td> {/* New column */}
              <td>{row.package_status}</td>
              <td>{row.employees_handle_id}</td> {/* New column */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
