"use client"
import Link from 'next/link';
import Layout from '../Components/Layout';
import ResForm, { UserData } from '../Components/ResForm';
import SmallScreen from '../Components/SmallScreen';
import React from 'react';

const AddReservation: React.FC = () => {
  const text = "Close";
  const label = 'Add Reservation';

  const handleSubmit = (userData: UserData) => {
    // Handle the form submission here
    //TO-DO: Take the user data and create a new reservation

  };



  return (
    <>
      {/* <Head>
          <title>Add Reservation/</title>
      </Head> */}
      <div><Layout
      // title={'Add Reservation'}
      /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">

            <ResForm onSubmit={handleSubmit} />



            <Link href='/reservations'>
              <button className="bluebutton" type="submit">

                {text}

              </button>
            </Link>


          </div>
        </div>
      </div>
    </>

  )

}
export default AddReservation;