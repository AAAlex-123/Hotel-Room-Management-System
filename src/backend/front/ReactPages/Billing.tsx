"use client"
import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import Search from '../Components/Search';
import React, { useState } from 'react';
import Link from 'next/link';

const Billing: React.FC = () => {
  const titles = ['28/04/2023 Room Charge', '28/04/2023 Food', '29/04/2023 Pool Usage'];
  const content = ['540.10', '30.45', '50.00'];
  const elem = 3;
  const text = "Close";
  const label = 'Billing';

  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (searchQuery: string) => {


    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };



  return (
    <>
      {/* <Head>
          <title>Billing</title>
      </Head> */}
      <div><Layout
      // title={'Billing'}
      /> </div>
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

            <Link href='/cashiering'>
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
export default Billing;