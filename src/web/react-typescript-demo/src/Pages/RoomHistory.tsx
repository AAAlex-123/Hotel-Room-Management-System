"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react';
import { Link } from 'react-router-dom';

const RoomHistory: React.FC = () => {
  const url=process.env.REACT_APP_URL
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
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
            <Link to='/room-management'>
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