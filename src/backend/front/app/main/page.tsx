import React from 'react'
import SideBar from '../../Components/SideBar';
import '../../Components/Component.css';
import Head from 'next/head';
import Image from 'next/image';


export default function Main() {
  const reservation_id = 123123
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
        {/* <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet' />
        <style>{`
        * {
            font-family: 'Aleo';font-size: 1rem;
        }
      `}</style> */}
      </Head>
      <div className='main'>
        <Image src="./Assets/logo.png" alt="Logo" style={imageStyle}></Image>
        <div className='bigBlock'>
          <Image className='userIcon' src="./Assets/Logo.png" alt="Kontonussy" style={imageStyle2}></Image>
          <div className='textBlock'>
            <div className='userText' style={{ fontSize: '1.5rem' }}>User</div>
            <div className='userText'>{reservation_id} </div>
            {/* this is where we'll put username so anastasi help */}
          </div>
        </div>
      </div>
      <SideBar />
    </>
  )
}




