import React from 'react'
import './Component.css';
import { NavigateFunction } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function SideBar() {

    const navigate= useNavigate()
  return (
    <>
    <nav>
    <ul className="nav-list">
        <li onClick={() => changePage('/reservations', navigate)}>Reservartions</li>
        <li onClick={() => changePage('/front desk', navigate)}>Front Desk</li>
        <li onClick={() => changePage('/arrivals', navigate)}>Arrivals</li>
        <li onClick={() => changePage('/room management', navigate)}>Room Management</li>
        <li onClick={() => changePage('/cashiering', navigate)}>Cashiering</li>
        <li onClick={() => changePage('/misc', navigate)}>Miscellaneous</li>

      </ul>
    </nav>
    </>
    
  )
}

function changePage(path: string, navigate: NavigateFunction){
    navigate(path, {replace: true})
  
  }


