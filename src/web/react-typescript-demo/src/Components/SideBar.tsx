import React from 'react'
import './Component.css';
import { NavigateFunction } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

export default function SideBar() {

    const navigate= useNavigate()
  return (
    <>
    <nav>
    <div className="nav-list">
        <div onClick={() => changePage('/reservations', navigate)}>Reservartions</div>
        <div onClick={() => changePage('/front desk', navigate)}>Front Desk</div>
        <div onClick={() => changePage('/arrivals', navigate)}>Arrivals</div>
        <div onClick={() => changePage('/room management', navigate)}>Room Management</div>
        <div onClick={() => changePage('/cashiering', navigate)}>Cashiering</div>
        <div onClick={() => changePage('/misc', navigate)}>Miscellaneous</div>

      <Link to='/'>
        <Button className="blueButton" type="submit">

          Exit

        </Button>
      </Link>
      </div>

    </nav>

    </>
    
  )
}

function changePage(path: string, navigate: NavigateFunction){
    navigate(path, {replace: true})
  
  }


