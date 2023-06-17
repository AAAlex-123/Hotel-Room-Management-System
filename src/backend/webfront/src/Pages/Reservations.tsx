"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const Reservations: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const labels = ['Add Reservation', 'Delete Reservation', 'Update Reservation', 'Find Reservation'];
  const elem = 4;
  const label = 'Reservations';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
    if (label === 'Add Reservation') {
      navigate('/reservations/add');
    } else if (label === 'Delete Reservation') {
      navigate('/reservations/delete');
    } else if (label === 'Update Reservation') {
      navigate('/reservations/update');
    } else if (label === 'Find Reservation') {
      navigate('/reservations/find');
    }
  };
  return (
    <>
      <Helmet>
        <title>Reservations</title>
      </Helmet>
      <div><Layout/> </div>
      <div> <SmallScreen label={label} />
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main' />

      </div>
    </>

  )
}

export default Reservations;