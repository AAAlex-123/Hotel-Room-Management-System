import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import Search from '../Components/Search';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const FrontDesk: React.FC = () => {
  const titles = ['Name', 'Room Number', 'Arrival Time', 'Visitors', 'Departure', 'Reservation Status', 'E-mail', 'Bill'];
  const content = ['Minako Arisato', 'O63,064', '12:00', '4', '31/05/2023', 'Confirmed', 'minakoaris@gmail.com', '450.30$'];
  const elem = 8;
  const text= "Close";
  const text2= "Check In";
  const label= 'Customer Check In';

  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (searchQuery: string) => {
 
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };



    return (
      <>
      <div><Layout/> </div>
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
      <Search onSearch={handleSearch} label="Arrival ID: "/>
        
       
    
       {showDetails && (
        <Details
          titles={titles}
          content={content}
          elem={elem}
          text={text}
          text2={text2}
          onClose={closeDetails}
        />
      )}
             
            <Link to='/main'>
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
export default FrontDesk;