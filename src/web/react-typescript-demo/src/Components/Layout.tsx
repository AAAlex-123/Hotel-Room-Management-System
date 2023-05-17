import React from 'react'
import Button from "react-bootstrap/Button";
import {Helmet} from "react-helmet";
import { NavigateFunction } from 'react-router-dom';
import './Component.css';


export default function Main() {

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
      <title> Main Menu </title>
      <link rel="icon" href="../../public/favicon.ico" />
      <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet'/>
        <style>{`
        * {
            font-family: 'Aleo';font-size: 1rem;
        }
      `}</style>
    </Helmet>
    <div className= 'main'>
    <img src="./Assets/logo.png" alt="Logo" style={imageStyle}></img>
      <div className='bigBlock'><img className='userIcon' src="./Assets/Stop Being Horny.png" alt="Kontonussy" style={imageStyle2}></img>
        <div className='textBlock'>
        <div className='userText'>User</div> 
        <div className='userText'>Id: Get Id pls </div> 
      {/* this is where we'll put username so anastasi help */} 
          </div>
        </div>
      </div>

  </>
  )
}


function changePage(path: string, navigate: NavigateFunction){
  navigate(path, {replace: true})

}

