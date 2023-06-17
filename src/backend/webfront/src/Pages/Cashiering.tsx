"use client"
import React, { Component } from 'react'
import Layout from '../Components/Layout'
import Grid from '../Components/Grid'
import SmallScreen from '../Components/SmallScreen'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const Cashiering: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const labels = ['Billing', 'Check Out', 'Fast Charge', 'Statistics'];
  const elem = 2;
  const label = 'Cashiering';
  const navigate = useNavigate();
  const handleLabelClick = (label: string) => {
    if (label === 'Billing') {
      navigate('/cashiering/billing');
    } else if (label === 'Check Out') {
      navigate('/cashiering/checkout');
    }
  };
  return (
    <>
      <Helmet>
        <title>Cashiering</title>
      </Helmet>
      <div><Layout /></div>
      <div> <SmallScreen label={label} />
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main' />
      </div>
    </>
  )
}
export default Cashiering;