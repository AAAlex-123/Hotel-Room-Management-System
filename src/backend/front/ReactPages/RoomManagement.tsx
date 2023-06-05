"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useRouter } from 'next/navigation'

const RoomManagement: React.FC = () => {
  const labels = ['Housekeeping', 'Maid Management', 'Room History', 'Out of Order/Service'];
  const elem = 4;
  const label= 'Room Management';
  const navigate = useRouter();
  const handleLabelClick = (label: string) => {
     if (label === 'Housekeeping') {
      navigate.push('/housekeeping');
    } else if (label === 'Maid Management') {
      navigate.push('/maid-management');
    } else if (label === 'Room History') {
      navigate.push('/room-history');
    } else if (label === 'Out of Order/Service') {
      navigate.push('/out-of-O/S');
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