"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';

const Reservations: React.FC = () => {
  const url=process.env.REACT_APP_URL
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const labels = ['Add Reservation', 'Delete Reservation', 'Update Reservation', 'Find Reservation'];
  const elem = 4;
  const label= 'Reservations';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
     if (label === 'Add Reservation') {
      navigate('/add-reservation');
    } else if (label === 'Delete Reservation') {
      navigate('/delete-reservation');
    } else if (label === 'Update Reservation') {
      navigate('/update-reservation');
    } else if (label === 'Find Reservation') {
      navigate('/find-reservation');
    }
  };
    return (
      <>
              {/* <Head>
          <title>Reservations</title>
      </Head> */}
      <div><Layout 
      // title={'Reservations'}
      /> </div>
      <div> <SmallScreen label={label}/>
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main'/>
        
       </div>
      </>
      
    )
  }

export default Reservations;