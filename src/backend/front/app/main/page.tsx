"use client"
import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar';
import '../components/Component.css';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { EmployeeEntityNoPass } from '../Employee';
import dynamic from 'next/dynamic';
export default async function Main() {
  const { push, refresh } = useRouter()
  const x=useSearchParams()
  const url = process.env.NEXT_PUBLIC_URL;
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const get_res = await fetch(`${url}/employee/${employee_id}`, { headers: { authorization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const imageStyle = {
    textAlign: 'center' as const,
    marginBottom: '1rem',
    padding: '1rem',
    width: '10rem',
    height: 'auto',
  };

  const imageStyle2 = {
    textAlign: 'center' as const,
    width: '4rem',
    padding: '1rem',
    height: 'auto',
    color: 'transparent',
    margin: '0.25rem',
  };
  return (
    <>
      <Head>
        <title> Main Menu</title>
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <div className='main'>
        <img src="/Assets/logo.png" alt="Logo" style={imageStyle}></img>
        <div className='bigBlock'>
          <img className='userIcon' src="/Assets/logo.png" alt="Logo" style={imageStyle2}></img>
          <div className='textBlock'>
            <div className='userText' style={{ fontSize: '1.5rem' }}>{employee?.name}</div>
            <div className='userText'>{employee?.employee_id} </div>
          </div>
        </div>
      </div>
      <SideBar />
    </>
  )
}





