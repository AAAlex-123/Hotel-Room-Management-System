"use client"
import React, { Component, useReducer } from 'react'
import Layout from '../main/page'
import Grid from '../../Components/Grid'
import SmallScreen from '../../Components/SmallScreen'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

const Reservations: React.FC = () => {
  const labels = ['Add Reservation', 'Delete Reservation', 'Update Reservation', 'Find Reservation'];
  const elem = 4;
  const label = 'Reservations';
  const navigate = useRouter();
  const handleLabelClick = (label: string) => {
    if (label === 'Add Reservation') {
      navigate.push('/reservations/add');
    } else if (label === 'Delete Reservation') {
      navigate.push('/reservations/delete');
    } else if (label === 'Update Reservation') {
      navigate.push('/reservations/update');
    } else if (label === 'Find Reservation') {
      navigate.push('/reservations/find');
    }
  };
  return (
    <>
      <Head>
        <title>Reservation</title>
      </Head>
      <div><Layout/> </div>
      <div> <SmallScreen label={label} />
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main' />

      </div>
    </>

  )
}

export default Reservations;