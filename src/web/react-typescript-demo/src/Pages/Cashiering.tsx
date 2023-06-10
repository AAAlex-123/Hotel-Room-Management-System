"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';

const Cashiering: React.FC = () => {
  const labels = ['Billing', 'Check Out', 'Fast Charge', 'Statistics'];
  const elem = 2;
  const label= 'Cashiering';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
     if (label === 'Billing') {
      navigate('/billing');
    } else if (label === 'Check Out') {
      navigate('/check-out');
    } else if (label === 'Fast Charge') {
      navigate('/fast-charge');
    } else if (label === 'Statistics') {
      navigate('/statistics');
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