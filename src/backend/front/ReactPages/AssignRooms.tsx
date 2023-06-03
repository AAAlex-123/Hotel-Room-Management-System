"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';
import Link  from 'next/link';
import Button from "react-bootstrap/Button";

const AssignRooms: React.FC = () => {
  const label= 'Assign Rooms';

    return (
      <>
        {/* <Head>
          <title>Assign Rooms</title>
      </Head> */}
      <div><Layout 
      // title={'Assign Rooms'}
      /> </div>
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
                To be added...
             
            <Link href='/maid-management'>
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
export default AssignRooms;