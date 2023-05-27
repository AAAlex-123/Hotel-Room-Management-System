import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import Search from '../Components/Search';
import React, { useState, Component } from 'react';
import Button from "react-bootstrap/Button";


const Arrivals: React.FC = () => {
  const titles = ['Name', 'Room Number', 'Arrival Time', 'Visitors', 'Departure', 'Reservation Status', 'E-mail', 'Bill'];
  const content = ['Minako Arisato', 'O63,064', '12:00', '4', '31/05/2023', 'Confirmed', 'minakoaris@gmail.com', '450.30$'];
  const elem = 8;
  const text= "Close";
  const link= '/arrivals'
  const label= 'Arrivals';


  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleSearch = (searchQuery: string) => {
    console.log('Search query received:', searchQuery);
    // Perform any desired actions with the search query
  };



    return (
      <>
      <div><Layout/> </div>
      <div> <SmallScreen label={label}/>
      <Search onSearch={handleSearch} label="Arrival ID"/>
        
       </div>
       {showDetails && (
        <Details
          titles={titles}
          content={content}
          elem={elem}
          text={text}
          
        />
        
      )}
    </>
      
    )
  
    }
export default Arrivals;