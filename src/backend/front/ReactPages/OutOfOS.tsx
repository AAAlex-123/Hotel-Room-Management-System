"use client"
import Link from 'next/link';
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';

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
export default OutOfOS;