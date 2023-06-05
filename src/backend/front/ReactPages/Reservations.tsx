"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useRouter } from 'next/navigation'

const Reservations: React.FC = () => {
  const labels = ['Add Reservation', 'Delete Reservation', 'Update Reservation', 'Find Reservation'];
  const elem = 4;
  const label= 'Reservations';
  const navigate = useRouter();
  const handleLabelClick = (label: string) => {
     if (label === 'Add Reservation') {
      navigate.push('/add-reservation');
    } else if (label === 'Delete Reservation') {
      navigate.push('/delete-reservation');
    } else if (label === 'Update Reservation') {
      navigate.push('/update-reservation');
    } else if (label === 'Find Reservation') {
      navigate.push('/find-reservation');
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