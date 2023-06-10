"use client"
import React, { Component } from 'react'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import SmallScreen from '../components/SmallScreen'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { EmployeeEntityNoPass } from '../Employee'

async function Reservations() {
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const url=process.env.NEXT_PUBLIC_URL;
  const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const labels = ['Add Reservation', 'Delete Reservation', 'Update Reservation', 'Find Reservation'];
  const elem = 4;
  const label = 'Reservations';
  const handleLabelClick = (label: string) => {
    if (label === 'Add Reservation') {
      push('/reservations/add');
    } else if (label === 'Delete Reservation') {
      push('/reservations/delete');
    } else if (label === 'Update Reservation') {
      push('/reservations/update');
    } else if (label === 'Find Reservation') {
      push('/reservations/find');
    }
  };
  return (
    <>
      <Head>
        <title>Reservations</title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee.name ?? ""} /></div>
      <div> <SmallScreen label={label} />
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main' />

      </div>
    </>

  )
}

export default Reservations;