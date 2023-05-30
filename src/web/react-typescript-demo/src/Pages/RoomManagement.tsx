import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';

const RoomManagement: React.FC = () => {
  const labels = ['Housekeeping', 'Maid Management', 'Room History', 'Out of Order/Service'];
  const elem = 4;
  const label= 'Room Management';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
     if (label === 'Housekeeping') {
      navigate('/housekeeping');
    } else if (label === 'Maid Management') {
      navigate('/maid-management');
    } else if (label === 'Room History') {
      navigate('/room-history');
    } else if (label === 'Out of Order/Service') {
      navigate('/out-of-O/S');
    } 
  };
    return (
      <>
      <div><Layout title={'Room Management'}/> </div>
      <div> <SmallScreen label={label}/>
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main'/>
        
       </div>
      </>
      
    )
  }

export default RoomManagement;