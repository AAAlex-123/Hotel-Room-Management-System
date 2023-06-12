"use client"
import React from 'react'
import './Component.css';
import { NavigateFunction } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function SideBar() {

    const navigate= useNavigate()
  return (
    <>
    <nav>
    <div className="nav-list">
        <div onClick={() => changePage('/reservations', navigate)}>Reservartions</div>
        <div onClick={() => changePage('/front', navigate)}>Front Desk</div>
        <div onClick={() => changePage('/arrivals', navigate)}>Arrivals</div>
        <div onClick={() => changePage('/room', navigate)}>Room Management</div>
        <div onClick={() => changePage('/cashiering', navigate)}>Cashiering</div>
        <div onClick={() => changePage('/misc', navigate)}>Miscellaneous</div>

      <Link to='/'>
        <button className="blueButton" type="submit">

          Exit

        </button>
      </Link>
      </div>

    </nav>

    </>
    
  )
}

function changePage(path: string, navigate: NavigateFunction){
    navigate(path, {replace: true})
  
  }


