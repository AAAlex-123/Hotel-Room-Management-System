"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';

const RoomManagement: React.FC = () => {
  const url=process.env.REACT_APP_URL
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const labels = ['Housekeeping', 'Maid Management', 'Room History', 'Out of Order/Service'];
  const elem = 2;
  const label= 'Room Management';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
     if (label === 'Housekeeping') {
      navigate('/housekeeping');
    } else if (label === 'Maid Management') {
      navigate('/maid-management');
    } else if (label === 'Room History') {
      navigate('/room-history');
    } else if (label === 'Out of Order/Service') {
      navigate('/out-of-O/S');
    } 
  };
    return (
      <>
              {/* <Head>
          <title>Room Management</title>
      </Head> */}
      <div><Layout 
      // title={'Room Management'}
      /> </div>
      <div> <SmallScreen label={label}/>
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main'/>
        
       </div>
      </>
      
    )
  }

export default RoomManagement;