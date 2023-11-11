import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../customer_handle/DataTable.css';

const AllPackages = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all_packages');
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
            <th>From Address</th>
            <th>To Address</th>
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
              <td>{row.from_address}</td>
              <td>{row.to_address}</td>
              <td>{row.package_status}</td>
              <td>{row.employees_handle_id}</td> {/* New column */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPackages;
