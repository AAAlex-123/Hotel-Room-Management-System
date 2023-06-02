"use client"
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


interface UserFormProps {
    onSubmit: (userData: UserData) => void;
  }
  
 export interface UserData {
    reservation_id: number;
    room_id: string[];
    arrival: Date;
    departure: Date;
    name: string;
    cellphone: string;
    city: string;
    country: string;
    address: string;
    postcode: string;
    visitor: number;
    email?: string | null;
    bill: string;
  }
  
  const ResForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [userData, setUserData] = useState<UserData>({
      reservation_id: 0,
      room_id: [],
      arrival: new Date(),
      departure: new Date(),
      name: '',
      cellphone: '',
      city: '',
      country: '',
      address: '',
      postcode: '',
      visitor: 0,
      email: null,
      bill: '',

    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(userData);
    };
  
    return (
        
        <Form className="form-container" onSubmit={handleSubmit} action="#">
        <div className="form-column">
        <Form.Group controlId="room_id">
          <Form.Control
            className="form-field-wrapper"
            type="text"
            name="room_id"
            value={userData.room_id}
            onChange={handleInputChange}
            placeholder="Room Number"
          />
        </Form.Group>
  
        <Form.Group controlId="arrival">
            <Form.Label>Arrival Date:</Form.Label>
          <Form.Control
            className="form-field-wrapper"
            type="date"
            name="arrival"
            value={userData.arrival.toISOString().split('T')[0]}
            onChange={handleInputChange}
            placeholder="Arrival Date"
          />
        </Form.Group>
  
        <Form.Group controlId="departure">
            <Form.Label>Departure Date:</Form.Label>
          <Form.Control
            className="form-field-wrapper"
            type="date"
            name="departure"
            value={userData.departure.toISOString().split('T')[0]}
            onChange={handleInputChange}
            placeholder="Departure Date"
          />
        </Form.Group>
  
        <Form.Group controlId="name">
          <Form.Control
            className="form-field-wrapper"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </Form.Group>
  
        <Form.Group controlId="cellphone">
          <Form.Control
            className="form-field-wrapper"
            type="text"
            name="cellphone"
            value={userData.cellphone}
            onChange={handleInputChange}
            placeholder="Cellphone"
          />
        </Form.Group>
  
        <Form.Group controlId="city">
          <Form.Control
            className="form-field-wrapper"
            type="text"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            placeholder="City"
          />
        </Form.Group>
        </div>
        <div className="form-column">
        <Form.Group controlId="country">
          <Form.Control
            className="form-field-wrapper"
            type="text"
            name="country"
            value={userData.country}
            onChange={handleInputChange}
            placeholder="Country"
          />
        </Form.Group>
  
        <Form.Group controlId="address">
          <Form.Control
            className="form-field-wrapper"
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
        </Form.Group>
  
        <Form.Group controlId="postcode">
          <Form.Control
            className="form-field-wrapper"
            type="text"
            name="postcode"
            value={userData.postcode}
            onChange={handleInputChange}
            placeholder="Postcode"
          />
        </Form.Group>
  
        <Form.Group controlId="visitor">
          <Form.Control
            className="form-field-wrapper"
            type="number"
            name="visitor"
            value={userData.visitor}
            onChange={handleInputChange}
            placeholder="Visitor"
          />
        </Form.Group>
  
        <Form.Group controlId="email">
          <Form.Control
            className="form-field-wrapper"
            type="email"
            name="email"
            value={userData.email || ''}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group controlId="bill">
          <Form.Control
            className="form-field-wrapper"
            type="string"
            name="bill"
            value={userData.bill}
            onChange={handleInputChange}
            placeholder="Bill"
          />
        </Form.Group>
        <Form.Group controlId="reservation_id">
            <Form.Label>Reservation ID:</Form.Label>
            <Form.Control
            className="form-field-wrapper"
            type="number"
            value= '0' // Called by database???
            disabled 
            />
      </Form.Group>
      </div>
        <div className='button-container'>
        <Button className="blueButton" type="submit">
          Submit
        </Button>
        </div>
      </Form>
    );
  };
  
  export default ResForm;