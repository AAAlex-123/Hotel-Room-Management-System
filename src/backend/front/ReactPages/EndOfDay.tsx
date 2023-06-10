"use client"
import React, { Component } from 'react'
import Layout from '../app/components/Layout'
import SmallScreen from '../app/components/SmallScreen'
import { Link } from 'react-router-dom';
import StatBox from '../app/components/StatBox';
import MoreStats from '../app/components/MoreStats';

const EndOfDay: React.FC = () => {
  const label = 'End Of Day Statistics';

  //TO:DO FETCH ALL THESE STATISTICS BABY???
  return (
    <>
      {/* <Head>
          <title>End Of Day</title>
      </Head> */}
      <div><Layout
      // title={'End Of Day'}
      /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <StatBox
              text1="Arrivals"
              num1={34}
              text2="In House" Ζ
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
              money='392,994' />

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
