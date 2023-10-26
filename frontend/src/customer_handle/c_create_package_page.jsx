import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePackageForm = () => {

  const navigate = useNavigate();

  const [weight, setWeight] = useState('');
//   const [street_address_from, setStreetAddressFrom] = useState('');
//   const [city_from, setCityFrom] = useState('');         STATED IN THE .JS FILE
//   const [state_from, setStateFrom] = useState('');
//   const [zip_from, setZipFrom] = useState('');
  const [street_address_to, setStreetAddressTo] = useState('');
  const [city_to, setCityTo] = useState('');
  const [state_to, setStateTo] = useState('');
  const [zip_to, setZipTo] = useState('');
  const [receive_f_name, setReceiveFName] = useState('');
  const [receive_l_name, setReceiveLName] = useState('');
  const [location_name, setLocationName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createPackageData = {
        weight,
        // street_address_from,
        // city_from,
        // state_from,
        // zip_from,
        street_address_to,
        city_to,
        state_to,
        zip_to,
        location_name,
        receive_f_name,
        receive_l_name
    };

    const token = localStorage.getItem('token'); //This is where you get the token from localStorage
    axios.post('http://localhost:3000/customer_create_package', createPackageData, {headers : {'Authorization': `Bearer ${token}`}})
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        navigate('/customer_mainpage')
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
              <h5 className="card-title text-center">Create Package</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="weight">Weight</label>
                  <input type="number" step="any" className="form-control" id="weight" placeholder="Enter the weight of your package" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} required />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="street_address_from">Street Address From</label>
                  <input type="text" className="form-control" id="street_address_from" placeholder="Enter the starting street address" value={street_address_from} onChange={(e) => setStreetAddressFrom(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="city_from">City From</label>
                  <input type="text" className="form-control" id="city_from" placeholder="Enter the starting city" value={city_from} onChange={(e) => setCityFrom(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="state_from">State From</label>
                  <input type="text" className="form-control" id="state_from" placeholder="Enter the starting state" value={state_from} onChange={(e) => setStateFrom(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="zip_from">Zip Code From</label>
                  <input type="text" className="form-control" id="zip_from" placeholder="Enter the starting zip code" value={zip_from} onChange={(e) => setZipFrom(e.target.value)} required />
                </div> */}
                {/* ... repeat for 'To' address, location_name, and receiver's name */}
                <div className="form-group">
                  <label htmlFor="street_address_to">Street Address To</label>
                  <input type="text" className="form-control" id="street_address_to" placeholder="Enter the destination street address" value={street_address_to} onChange={(e) => setStreetAddressTo(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="city_to">City To</label>
                  <input type="text" className="form-control" id="city_to" placeholder="Enter the destination city" value={city_to} onChange={(e) => setCityTo(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="state_to">State To</label>
                  <input type="text" className="form-control" id="state_to" placeholder="Enter the destination state" value={state_to} onChange={(e) => setStateTo(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="zip_to">Zip Code To</label>
                  <input type="text" className="form-control" id="zip_to" placeholder="Enter the destination zip code" value={zip_to} onChange={(e) => setZipTo(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="location_name">Location Name</label>
                  <input type="text" className="form-control" id="location_name" placeholder="Enter the location name" value={location_name} onChange={(e) => setLocationName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="receive_f_name">Receiver's First Name</label>
                  <input type="text" className="form-control" id="receive_f_name" placeholder="Enter the receiver's first name" value={receive_f_name} onChange={(e) => setReceiveFName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="receive_l_name">Receiver's Last Name</label>
                  <input type="text" className="form-control" id="receive_l_name" placeholder="Enter the receiver's last name" value={receive_l_name} onChange={(e) => setReceiveLName(e.target.value)} required />
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Create Package" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePackageForm;
