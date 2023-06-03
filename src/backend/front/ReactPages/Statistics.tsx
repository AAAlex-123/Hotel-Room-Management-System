"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';
import Link  from 'next/link';
import Button from "react-bootstrap/Button";

const Statistics: React.FC = () => {
  const label= 'Statistics';

    return (
      <>
              {/* <Head>
          <title>Statistics</title>
      </Head> */}
      <div><Layout 
    //   title={'Statistics'}
      /> </div>
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
            This is not part of the system for now but an additional feature to be explored in the future...
             
            <Link href='/cashiering'>
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
export default Statistics;