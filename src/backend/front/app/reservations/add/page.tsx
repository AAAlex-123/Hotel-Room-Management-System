"use client"
import Layout from '../../main/page';
import ResForm, { UserData } from '../../../Components/ResForm';
import SmallScreen from '../../../Components/SmallScreen';
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Link from 'next/link';
import Head from 'next/head';

const AddReservation: React.FC = () => {
  const text = "Close";
  const label = 'Add Reservation';

  const handleSubmit = async (userData: UserData) => {
    await fetch("http://host.docker.internal:8081/reservations", { cache: "no-cache", method: "POST", body: JSON.stringify(userData) })
  };



  return (
    <>
      <Head>
        <title>Add Reservation</title>
      </Head>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">

            <ResForm onSubmit={handleSubmit} />



            <Link href='/reservations'>
              <Button className="blueButton" type="submit">

                {text}

              </Button>
            </Link>


          </div>
        </div>
      </div>
    </>

  )

}
export default AddReservation;