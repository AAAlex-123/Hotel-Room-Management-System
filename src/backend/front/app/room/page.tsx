"use client"
import React from 'react'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import SmallScreen from '../components/SmallScreen'
import { useRouter } from 'next/navigation'
import { EmployeeEntityNoPass } from '../Employee'
import Head from 'next/head'

const RoomManagement: React.FC = async () => {
  const labels = ['Housekeeping', 'Maid Management', 'Room History', 'Out of Order/Service'];
  const elem = 4;
  const label = 'Room Management';
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const url=process.env.NEXT_PUBLIC_URL??"hey";
  console.log(url);
  
  const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const handleLabelClick = (label: string) => {
    if (label === 'Housekeeping') {
      push('/room/housekeeping');
    } else if (label === 'Maid Management') {
      push('/maid');
    } else if (label === 'Room History') {
      push('/room/history');
    } else if (label === 'Out of Order/Service') {
      push('/room/ooo_s');
    }
  };
  return (
    <>
      <Head>
        <title>Room Management</title>
      </Head>
      <div><Layout id={employee_id ? Number(employee_id) : -1} username={employee.name??""} /> </div>
      <div> <SmallScreen label={label} />
        <Grid labels={labels} elem={elem} clicked={handleLabelClick} link='/main' />
      </div>
    </>

  )
}

export default RoomManagement;