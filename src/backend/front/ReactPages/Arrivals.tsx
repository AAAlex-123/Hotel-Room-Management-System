"use client"
import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import Search from '../Components/Search';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';

const Arrivals: React.FC = () => {
  const titles = ['Name', 'Room Number', 'Arrival Time', 'Visitors', 'Departure', 'E-mail', 'Bill'];
  const content = ['Minako Arisato', 'O63,064', '12:00', '4', '31/05/2023',  'minakoaris@gmail.com', '450.30$'];
  const elem = 7;
  const text= "Close";
  const label= 'Arrivals';

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
          <title>Arrivals </title>
      </Head> */}
      <div><Layout
      //  title={'Arrivals'}
       /> </div>
      <div> <SmallScreen label={label}/>
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
             
            <Link to='/main'>
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
export default Arrivals;