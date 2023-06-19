"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React from 'react'
import Helmet from 'react-helmet'
import {Link} from 'react-router-dom'
const Statistics: React.FC = () => {
  const url = window.location.origin + "/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const label = 'Statistics';

  return (
    <>
      <Helmet>
         <title>Statistics</title>
      </Helmet>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            This is not part of the system for now but an additional feature to be explored in the future...

            <Link to='/cashiering'>
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
export default Statistics;