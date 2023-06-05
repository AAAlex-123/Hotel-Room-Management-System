"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useRouter } from 'next/router'

const Cashiering: React.FC = () => {
  const labels = ['Billing', 'Check Out', 'Fast Charge', 'Statistics'];
  const elem = 4;
  const label= 'Cashiering';
  const navigate = useRouter();
  const handleLabelClick = (label: string) => {
     if (label === 'Billing') {
      navigate.push('/billing');
    } else if (label === 'Check Out') {
      navigate.push('/check-out');
    } else if (label === 'Fast Charge') {
      navigate.push('/fast-charge');
    } else if (label === 'Statistics') {
      navigate.push('/statistics');
    }
  };
    return (
      <>
        {/* <Head>
          <title>Cashiering</title>
      </Head> */}
      <div><Layout 
      // title={'Cashiering'}
      /> </div>
      <div> <SmallScreen label={label}/>
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main'/>
        
       </div>
      </>
      
    )
  }

export default Cashiering;