"use client"
import Head from 'next/head';
import Layout from '../../components/Layout'
import SmallScreen from '../../components/SmallScreen'
import React from 'react';
import Link from 'next/link';
import { EmployeeEntityNoPass } from '@/app/Employee';
import { useRouter } from 'next/navigation';

const RoomHistory: React.FC = async () => {
  const label = 'Room History';
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const url=process.env.NEXT_PUBLIC_URL;
  const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authrization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  return (
    <>
      <Head>
        <title>Room History</title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee.name ?? ""} /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <Link href='/room'>
              <button className="blueButton" type="submit">
                Close
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>

  )

}
export default RoomHistory;