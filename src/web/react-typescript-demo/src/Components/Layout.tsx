"use client"
import SideBar from './SideBar';
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import { EmployeeEntityNoPass } from '../Components/Employee';
import './Component.css';

export default function Main(
) {

  const employee_id = localStorage.getItem('employee_id');
  const token = localStorage.getItem('token');
  const url = process.env.REACT_APP_URL;

  const [employee, setEmployee] = useState<EmployeeEntityNoPass>()

  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/employee/${employee_id}`, { headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        const employee: EmployeeEntityNoPass = await response.json()
        setEmployee(employee)
      }
    }
    hey().catch(console.error)
  })

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
      <Helmet>
        {/* <title> {title}</title> */}
        <link rel="icon" href="../../public/favicon.ico" />
        <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet' />
        <style>{`
        * {
            font-family: 'Aleo';font-size: 1rem;
        }
      `}</style>
      </Helmet>
      <div className='main'>
        <img src="/Assets/logo.png" alt="Logo" style={imageStyle}></img>
        <div className='bigBlock'><img className='userIcon' src="/Assets/profile.png" alt="Profile" style={imageStyle2}></img>
          <div className='textBlock'>
            <div className='userText' style={{ fontSize: '1.5rem' }}>User: {employee?.name}</div>
            <div className='userText'>Id: {employee_id} </div>

          </div>
        </div>
      </div>
      <SideBar />
    </>
  )
}




