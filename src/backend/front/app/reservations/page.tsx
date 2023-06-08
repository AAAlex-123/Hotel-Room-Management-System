"use client"
import React, { Component } from 'react'
import Layout from '../../Components/Layout'
import Grid from '../../Components/Grid'
import SmallScreen from '../../Components/SmallScreen'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { EmployeeEntityNoPass } from '../Employee'

async function Reservations() {
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const get_res = await fetch(`http://localhost:8081/api/employee/${employee_id}`, { cache: "no-cache", headers: { authrization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const labels = ['Add Reservation', 'Delete Reservation', 'Update Reservation', 'Find Reservation'];
  const elem = 4;
  const label = 'Reservations';
  const handleLabelClick = (label: string) => {
    if (label === 'Add Reservation') {
      push('/reservation/add');
    } else if (label === 'Delete Reservation') {
      push('/reservation/delete');
    } else if (label === 'Update Reservation') {
      push('/reservation/update');
    } else if (label === 'Find Reservation') {
      push('/reservation/find');
    }
  };
  return (
    <>
      <Head>
        <title>Reservations</title>
      </Head>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main' />

      </div>
    </>

  )
}

export default Reservations;