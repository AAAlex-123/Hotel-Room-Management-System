"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useRouter } from 'next/navigation'

const Reservations: React.FC = () => {
  const labels = ['Create Group', 'Assign Rooms', 'Room Notes', 'Orders'];
  const elem = 4;
  const label= 'Maid Management';
  const navigate = useRouter();
  const handleLabelClick = (label: string) => {
     if (label === 'Create Group') {
      navigate.push('/create-group');
    } else if (label === 'Assign Rooms') {
      navigate.push('/assign-rooms');
    } else if (label === 'Room Notes') {
      navigate.push('/room-notes');
    } else if (label === 'Orders') {
      navigate.push('/orders');
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

export default Reservations;