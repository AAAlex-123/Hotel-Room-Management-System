"use client"
import Link from 'next/link';
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';

const RoomHistory: React.FC = () => {
  const label= 'Room History';

    return (
      <>
              {/* <Head>
          <title>Room History</title>
      </Head> */}
      <div><Layout 
      // title={'Room History'}
      /> </div>
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
                To be added...
             
            <Link href='/room-management'>
            <button className="bluebutton" type="submit">
    
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