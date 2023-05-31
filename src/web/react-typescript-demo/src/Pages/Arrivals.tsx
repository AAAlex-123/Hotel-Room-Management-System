import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import Search from '../Components/Search';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const Arrivals: React.FC = () => {
  const titles = ['Name', 'Room Number', 'Arrival Time', 'Visitors', 'Departure', 'E-mail', 'Bill'];
  const content = ['Minako Arisato', 'O63,064', '12:00', '4', '31/05/2023',  'minakoaris@gmail.com', '450.30$'];
  const elem = 7;
  const text= "Close";
  const label= 'Arrivals';

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
      <div><Layout title={'Arrivals'}/> </div>
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
          text2={null}
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
export default Arrivals;