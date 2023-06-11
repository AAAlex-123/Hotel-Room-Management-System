"use client"
import Link from 'next/link';
import Layout from '../../components/Layout'
import SmallScreen from '../../components/SmallScreen'
import React from 'react';
import Head from 'next/head';
import { EmployeeEntityNoPass } from '@/app/Employee';
import { useRouter } from 'next/navigation';

async function OutOfOS() {
  // const label = 'Out Of O/S';
  // const { push, refresh } = useRouter()
  // const employee_id = localStorage.getItem("employee_id")
  // const token = localStorage.getItem("token")
  // const url=process.env.NEXT_PUBLIC_URL;
  // const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  // if (!get_res.ok) {
  //   push("/")
  // }
  // const employee: EmployeeEntityNoPass = await get_res.json()
  // return (
  //   <>
  //     <Head>
  //       <title>Out Of Order/Service</title>
  //     </Head>
  //     <div><Layout id={Number(employee_id ?? "-1")} username={employee.name ?? ""} /> </div>
  //     <div> <SmallScreen label={label} />
  //       <div className="res-container">
  //         <div className="whiteBox">
  //           To be added...

  //           <Link href='/room'>
  //             <button className="blueButton" type="submit">
  //               Close
  //             </button>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </>

  // )
  <></>

}
export default OutOfOS;