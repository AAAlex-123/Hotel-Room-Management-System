"use client"
import { Helmet } from 'react-helmet';
import Layout from '../Components/Layout';
import ResForm, { UserData } from '../Components/ResForm';
import SmallScreen from '../Components/SmallScreen';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const AddReservation: React.FC = () => {
  const url = window.location.origin+"/api";
  const text = "Close";
  const label = 'Add Reservation';
  const navigate = useNavigate();
  const employee_id = localStorage.getItem('employee_id');
  const token = localStorage.getItem('token');


  const handleSubmit = async (userData: UserData) => {
    try {
      const response = await fetch(`${url}/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })
      if (response.ok) {
        navigate('/reservations')
      } else {
        alert("Could not file Reservation");
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <>
      <Helmet>
        <title>Add Reservation</title>
      </Helmet>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <ResForm onSubmit={handleSubmit} />
            <Link to='/reservations'>
              <button className="blueButton" type="submit">
                {text}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )

}
export default AddReservation;