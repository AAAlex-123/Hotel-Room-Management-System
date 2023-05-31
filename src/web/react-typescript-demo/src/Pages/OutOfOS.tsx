"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const OutOfOS: React.FC = () => {
  const label= 'Out Of O/S';

    return (
      <>
              {/* <Head>
          <title>Out Of Order/Service</title>
      </Head> */}
      <div><Layout 
      // title={'Out Of Order/Service'}
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
export default OutOfOS;