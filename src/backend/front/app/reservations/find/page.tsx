"use client"
import Layout from '../../main/page'
import Details from '../../../Components/Details';
import SmallScreen from '../../../Components/SmallScreen'
import Search from '../../../Components/Search';
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Link from 'next/link';
import Head from 'next/head';

const FindReservation: React.FC = () => {
  const titles = ['Room Number', 'Arrival', 'Departure', 'Name', "Cellphone", 'Visitors', 'E-mail', 'Bill'];
  const content = ['O63,064', '29/05/2023', '31/05/2023', 'Minako Arisato', "+81 32 8049 3201", '4', "17705", 'minakoaris@gmail.com', '450.30$'];
  const elem = 8;
  const text = "Close";
  const label = 'Find Reservation';

  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    const result = await fetch(`http://host.docker.internal:8081/api/reservations?search=${searchQuery}`)
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };



  return (
    <>
      <Head>
        <title>Find Reservation</title>
      </Head>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <Search onSearch={handleSearch} label="Arrival ID: " />



            {showDetails && (
              <Details
                titles={titles}
                content={content}
                elem={elem}
                text={text}
                text2={null}
                onClose={closeDetails}
              />
            )}

            <Link href='/main'>
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
export default FindReservation;