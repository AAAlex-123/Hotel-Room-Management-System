import Layout from '../Components/Layout';
import ResForm, {UserData} from '../Components/ResForm';
import SmallScreen from '../Components/SmallScreen';
import Search from '../Components/Search';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const AddReservation: React.FC = () => {
  const text= "Close";
  const label= 'Add Reservation';

  const handleSubmit = (userData: UserData) => {
    // Handle the form submission here
    console.log(userData);
  };



    return (
      <>
      <div><Layout/> </div>
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