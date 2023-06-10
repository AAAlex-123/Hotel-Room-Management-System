"use client"
import React from 'react'
import SideBar from '@/app/components/SideBar';
import './Component.css';
import Head from 'next/head';



export default function Main(
) {

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
        {/* <title> {title}</title> */}
        <link rel="icon" href="../../public/favicon.ico" />
        <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet' />
        <style>{`
        * {
            font-family: 'Aleo';font-size: 1rem;
        }
      `}</style>
      </Head>
      <div className='main'>
        <img src="/Assets/logo.png" alt="Logo" style={imageStyle}></img>
        <div className='bigBlock'><img className='userIcon' src="/Assets/profile.png" alt="Profile" style={imageStyle2}></img>
          <div className='textBlock'>
            <div className='userText' style={{ fontSize: '1.5rem' }}>User</div>
            <div className='userText'>Id: Get Id pls </div>
          </div>
        </div>
      </div>
      <SideBar />
    </>
  )
}




