"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import { Link } from 'react-router-dom';
import StatBox from '../Components/StatBox';
import MoreStats from '../Components/MoreStats';

const EndOfDay: React.FC = () => {
    const label= 'End Of Day Statistics';

    //TO:DO FETCH ALL THESE STATISTICS BABY???
      return (
        <>
                {/* <Head>
          <title>End Of Day</title>
      </Head> */}
        <div><Layout 
        // title={'End Of Day'}
        /> </div>
        <div> <SmallScreen label={label}/>
        <div className="res-container">
      <div className="whiteBox">
        <StatBox 
            text1="Arrivals"
            num1={34}
            text2="In House"
            num2={167}
            text3="Departures"
            num3={25} />


        <MoreStats 
                text1="Max % Occ."
                num1={'73%'}
                text2="Max Occ."
                num2={176}
                text3="Min Avail."
                num3={25}
                money= '392,994' />

      <Link to='/misc'>
            <button className="blueButton" type="submit">
    
              Close
    
            </button>
          </Link>

          </div>

          </div>



         </div>
        </>
        
      )
    }
  
  export default EndOfDay;
