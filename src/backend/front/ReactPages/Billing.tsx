"use client"
import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import Search from '../Components/Search';
import React, { useState} from 'react';
import Link  from 'next/link';
import Button from "react-bootstrap/Button";

const Billing: React.FC = () => {
  const titles = ['28/04/2023 Room Charge', '28/04/2023 Food', '29/04/2023 Pool Usage'];
  const content = ['540.10', '30.45', '50.00'];
  const elem = 3;
  const text= "Close";
  const label= 'Billing';

  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (searchQuery: string) => {
        // TO-DO: You see the titles/content stuff? Ok cool when the search happens just add the details of the bill in them instead of this 
    //temporary content. The search bar works based on...Reservation ID or what? You decide idk. 
 
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
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
      <Search onSearch={handleSearch} label="Reservation ID: "/>
        
       
    
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
export default Billing;