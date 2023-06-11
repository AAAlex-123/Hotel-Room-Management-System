"use client"
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import SmallScreen from '../components/SmallScreen'
import { notFound, useRouter } from 'next/navigation'
import { EmployeeEntityNoPass } from '../Employee'
import Head from 'next/head'

async function Reservations() {
  const labels = ['Create Group', 'Assign Rooms', 'Room Notes', 'Orders'];
  const elem = 4;
  const label = 'Maid Management';
  const { push } = useRouter()
  const [employee,setEmployee]=useState<EmployeeEntityNoPass>()
  const [employee_id,setEmployeeId]=useState("-1")
  useEffect(()=>{
    async function temp() {
      const employee_id = localStorage.getItem("employee_id")
      setEmployeeId(employee_id??"-1")
      const token = localStorage.getItem("token")
      const url = process.env.NEXT_PUBLIC_URL;
      const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
      if (!get_res.ok) {
        push("/")
      }
      const employee: EmployeeEntityNoPass = await get_res.json()
      setEmployee(employee)
    }
    temp().catch(console.error)
  })

  const handleLabelClick = (label: string) => {
    if (label === 'Create Group') {
      push('/maid/group');
    } else if (label === 'Assign Rooms') {
      push('/maid/assign');
    } else if (label === 'Room Notes') {
      push('/room/notes');
    } else if (label === 'Orders') {
      push('/maid/orders');
    }
  };
  return (
    <>
      <Head>
        <title>Maid Management</title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee?.name ?? ""} /> </div>
      <div> <SmallScreen label={label} />
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/room-management' />
      </div>
    </>
  )
}

export default Reservations;