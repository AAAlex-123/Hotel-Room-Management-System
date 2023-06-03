"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';
import Link  from 'next/link';
import Button from "react-bootstrap/Button";

const CreateGroup: React.FC = () => {
  const label= 'Create Group';

    return (
      <>
              {/* <Head>
          <title>Create Group</title>
      </Head> */}
      <div><Layout 
      // title={'Create Group'}
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
export default CreateGroup;