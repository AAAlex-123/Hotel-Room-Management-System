import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import Search from '../Components/Search';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import ResForm, {UserData} from '../Components/ResForm';

const UpdateReservation: React.FC = () => {
  const titles = ['Room Number', 'Arrival', 'Departure', 'Name', "Cellphone",  'Visitors','E-mail', 'Bill' ];
  const content = [ 'O63,064', '29/05/2023',  '31/05/2023', 'Minako Arisato', "+81 32 8049 3201", '4', "17705", 'minakoaris@gmail.com', '450.30$'];
  const elem = 8;
  const text= "Close";
  const text2="Update";
  const label= 'Update Reservation';

  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };
  
  const handleSubmit = (userData: UserData) => {
    // Handle the form submission here please I'm tired of copy-pasting the same form you get the idea

  };

  const handleButtonClick = () => {
    setShowForm(true);
    setShowDetails(false);
  };
  



    return (
      <>
      <div><Layout title={'Update Reservation'}/> </div>
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
          text2={text2}
          onClose={closeDetails}
          onButtonClick={handleButtonClick}
        />
      )}

      {showForm && (
              <ResForm onSubmit={handleSubmit} />
            )}
             
            <Link to='/reservations'>
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
export default UpdateReservation;