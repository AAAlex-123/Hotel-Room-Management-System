"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const Housekeeping: React.FC = () => {
  const label= 'Housekeeping';

    return (
      <>
              {/* <Head>
          <title>Housekeeping</title>
      </Head> */}
      <div><Layout 
      // title={'Housekeeping'}
      /> </div>
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
                To be added...
             
            <Link to='/room-management'>
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
export default Housekeeping;