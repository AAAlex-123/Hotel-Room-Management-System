import Layout from '../Components/Layout';
import ResForm, {UserData} from '../Components/ResForm';
import SmallScreen from '../Components/SmallScreen';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const AddReservation: React.FC = () => {
  const text= "Close";
  const label= 'Add Reservation';

  const handleSubmit = (userData: UserData) => {
    // Handle the form submission here
    //TO-DO: Take the user data and create a new reservation

  };



    return (
      <>
      <div><Layout title={'Add Reservation'}/> </div>
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
        
      <ResForm onSubmit={handleSubmit} />
    
   
             
            <Link to='/reservations'>
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