"use client"
import Head from 'next/head';
import Layout from '../../components/Layout'
import SmallScreen from '../../components/SmallScreen'
import React from 'react';
import Link from 'next/link';

const RoomHistory: React.FC = () => {
  const label = 'Room History';
  
  return (
    <>
      <Head>
        <title>Room History</title>
      </Head>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <Link href='/room'>
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
export default RoomHistory;