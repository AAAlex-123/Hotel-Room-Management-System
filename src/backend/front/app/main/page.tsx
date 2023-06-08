import React from 'react'
import SideBar from '../../Components/SideBar';
import '../Components/Component.css';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '../Employee';


export default async function Main() {
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const get_res = await fetch(`http://localhost:8081/api/employee/${employee_id}`, { cache: "no-cache", headers: { authrization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee:EmployeeEntityNoPass = await get_res.json()
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
        <Image src="./Assets/logo.png" alt="Logo" style={imageStyle}></Image>
        <div className='bigBlock'>
          <Image className='userIcon' src="./Assets/Logo.png" alt="Logo" style={imageStyle2}></Image>
          <div className='textBlock'>
            <div className='userText' style={{ fontSize: '1.5rem' }}>User</div>
            <div className='userText'>{employee.name} </div>
          </div>
        </div>
      </div>
      <SideBar />
    </>
  )
}




