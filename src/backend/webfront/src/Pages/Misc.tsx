"use client"
import React from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const Misc: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const labels = ['End Of Day', 'Guest Messages', 'Staff Messages'];
  const elem = 1;
  const label = 'Miscellaneous';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
    if (label === 'End Of Day') {
      navigate('/misc/end-of-day');
    } else if (label === 'Guest Messages') {
      navigate('/misc/guest-messages');
    } else if (label === 'Staff Messages') {
      navigate('/misc/staff-messages');
    }
  };
  return (
    <>
      <Helmet>
        <title>Miscellaneous</title>
      </Helmet>
      <div><Layout/> </div>
      <div> <SmallScreen label={label} />
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main' />
      </div>
    </>
  )
}

export default Misc;