"use client"
import Layout from '../components/Layout'
import Details from '../components/Details';
import SmallScreen from '../components/SmallScreen'
import Search from '../components/Search';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '../Employee';
import Head from 'next/head';

async function Arrivals() {
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const get_res = await fetch(`http://localhost:8081/api/employee/${employee_id}`, { cache: "no-cache", headers: { authrization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const titles = ['Name', 'Room Number', 'Arrival Time', 'Visitors', 'Departure', 'E-mail', 'Bill'];
  const content = ['Minako Arisato', 'O63,064', '12:00', '4', '31/05/2023', 'minakoaris@gmail.com', '450.30$'];
  const elem = 7;
  const text = "Close";
  const label = 'Arrivals';

  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (searchQuery: string) => {

    // TO-DO: You see the titles/content stuff? Ok cool when the search happens just add the details of the Arrival in them instead of this 
    //temporary content. The search bar works based on...Arrival ID or what? You decide idk. 

    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };
  return (
    <>
      <Head>
        <title>Arrivals </title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee.name ?? ""} /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <Search onSearch={handleSearch} />
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
export default Arrivals;