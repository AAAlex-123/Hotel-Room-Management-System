"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';

const Misc: React.FC = () => {
  const labels = ['End Of Day', 'Guest Messages', 'Staff Messages'];
  const elem = 3;
  const label= 'Miscellaneous';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
     if (label === 'End Of Day') {
      navigate('/end-of-day');
    } else if (label === 'Guest Messages') {
      navigate('/guest-messages');
    } else if (label === 'Staff Messages') {
      navigate('/staff-messages');
    } 
  };
    return (
      <>
                    {/* <Head>
          <title>Miscellaneous</title>
      </Head> */}
      <div><Layout 
      // title={'Miscellaneous'}
      /> </div>
      <div> <SmallScreen label={label}/>
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main'/>
        
       </div>
      </>
      
    )
  }

export default Misc;