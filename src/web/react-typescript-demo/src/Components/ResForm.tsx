"use client"
import React, { useState, useEffect } from 'react';


interface UserFormProps {
    onSubmit: (userData: UserData) => void;
    initialData?: UserData;
  }
  
 export interface UserData {
    reservation_id?: number;
    room_id: string;
    arrival: Date;
    departure: Date;
    name: string;
    cellphone: string;
    city?: string;
    country?: string;
    address?: string;
    postcode?: string;
    visitor?: number;
    email?: string;
    bill?: number;
  }
  
  const ResForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
    const [userData, setUserData] = useState<UserData>(
      initialData || {
      reservation_id: undefined,
      room_id: '',
      arrival: new Date(),
      departure: new Date(),
      name: '',
      cellphone: '',
      city: '',
      country: '',
      address: '',
      postcode: '',
      visitor: 0,
      email: '',
      bill: 0,

    });
  
    useEffect(() => {
      if (initialData) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          reservation_id: initialData.reservation_id, // Set the provided reservation_id
        }));
      }
    }, [initialData]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
    
      const parsedValue = name === 'arrival' || name === 'departure' ? new Date(value) : value;
    
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: parsedValue,
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(userData);
    };


    

  
    return (
<form className="form-container" onSubmit={handleSubmit} action="#">
  <div className="form-column">
    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="text"
        name="room_id"
        value={userData.room_id}
        onChange={handleInputChange}
        placeholder="Room Number"
      />
    </div>

    <div className="form-group">
      <label>Arrival Date:</label>
      <input
        className="form-field-wrapper"
        type="date"
        name="arrival"
        value={userData.arrival instanceof Date ? userData.arrival.toISOString().split('T')[0] : ''}
        onChange={handleDateChange}
        placeholder="Arrival Date"
      />
    </div>

    <div className="form-group">
      <label>Departure Date:</label>
      <input
        className="form-field-wrapper"
        type="date"
        name="departure"
        value={userData.departure instanceof Date ? userData.departure.toISOString().split('T')[0] : ''}
        onChange={handleDateChange}
        placeholder="Departure Date"
      />
    </div>

    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="text"
        name="name"
        value={userData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
    </div>

    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="text"
        name="cellphone"
        value={userData.cellphone}
        onChange={handleInputChange}
        placeholder="Cellphone"
      />
    </div>

    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="text"
        name="city"
        value={userData.city}
        onChange={handleInputChange}
        placeholder="City"
      />
    </div>
  </div>

  <div className="form-column">
    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="text"
        name="country"
        value={userData.country}
        onChange={handleInputChange}
        placeholder="Country"
      />
    </div>

    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="text"
        name="address"
        value={userData.address}
        onChange={handleInputChange}
        placeholder="Address"
      />
    </div>

    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="text"
        name="postcode"
        value={userData.postcode}
        onChange={handleInputChange}
        placeholder="Postcode"
      />
    </div>

    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="number"
        name="visitor"
        value={userData.visitor}
        onChange={handleInputChange}
        placeholder="Visitor"
      />
    </div>

    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="email"
        name="email"
        value={userData.email || ''}
        onChange={handleInputChange}
        placeholder="Email"
      />
    </div>

    <div className="form-group">
      <input
        className="form-field-wrapper"
        type="string"
        name="bill"
        value={userData.bill}
        onChange={handleInputChange}
        placeholder="Bill"
      />
    </div>

    <div className="form-group">
      <label>Reservation ID:</label>
      <input
        className="form-field-wrapper"
        type="number"
        value="0" // Called by database???
        disabled
      />
    </div>
  </div>

  <div className="button-container">
    <button className="blueButton" type="submit">
      Submit
    </button>
  </div>
</form>
    );
  };
  
  export default ResForm;