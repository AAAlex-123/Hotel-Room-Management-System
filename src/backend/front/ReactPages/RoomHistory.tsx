"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';
import Link  from 'next/link';
import Button from "react-bootstrap/Button";

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
            <Button className="blueButton" type="submit">
    
              Close
    
            </Button>
          </Link>


        </div>
        </div>
        </div>
    </>
      
    )
  
    }
export default RoomHistory;