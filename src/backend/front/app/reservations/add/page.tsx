"use client"
import Link from 'next/link';
import Layout from '../../components/Layout';
import ResForm, { UserData } from '../../components/ResForm';
import SmallScreen from '../../components/SmallScreen';
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';

async function AddReservation() {
  const text = "Close";
  const label = 'Add Reservation';
  const { push} = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const get_res = await fetch(`http://localhost:8081/api/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()

  const handleSubmit = async (userData: UserData) => {
    try {
      const response = await fetch(`http://localhost:8081/api/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })
      push('/reservations')
    } catch (err: any) {
      console.log(err)
    }
  };



  return (
    <>
      <Head>
        <title>Add Reservation/</title>
      </Head>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <ResForm onSubmit={handleSubmit} />
            <Link href='/reservations'>
              <button className="blueButton" type="submit">
                {text}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>

  )

}
export default AddReservation;