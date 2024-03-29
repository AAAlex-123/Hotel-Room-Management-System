"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';

const MaidManagement: React.FC = () => {
  const labels = ['Delete Group', 'Assign Rooms', 'Room Notes', 'Orders'];
  const elem = 4;
  const label= 'Maid Management';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
     if (label === 'Delete Group') {
      navigate('/delete-group');
    } else if (label === 'Assign Rooms') {
      navigate('/assign-rooms');
    } else if (label === 'Room Notes') {
      navigate('/room-notes');
    } else if (label === 'Orders') {
      navigate('/orders');
    }
  };
    return (
      <>
              {/* <Head>
          <title>Maid Management</title>
      </Head> */}
      <div><Layout 
      // title={'Maid Management'}
      /> </div>
      <div> <SmallScreen label={label}/>
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/room-management'/>
        
       </div>
      </>
      
    )
  }

export default MaidManagement;