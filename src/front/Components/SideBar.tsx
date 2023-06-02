"use client"
import React from 'react'
import './Component.css';
import Link from 'next/link';
import Button from "react-bootstrap/Button";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export default function SideBar() {

  const navigate = useRouter()
  return (
    <>
      <nav>
        <div className="nav-list">
          <div onClick={() => changePage('/reservations', navigate)}>Reservartions</div>
          <div onClick={() => changePage('/frontdesk', navigate)}>Front Desk</div>
          <div onClick={() => changePage('/arrivals', navigate)}>Arrivals</div>
          <div onClick={() => changePage('/room-management', navigate)}>Room Management</div>
          <div onClick={() => changePage('/cashiering', navigate)}>Cashiering</div>
          <div onClick={() => changePage('/misc', navigate)}>Miscellaneous</div>

          <Link href='/'>
            <Button className="blueButton" type="submit">

              Exit

            </Button>
          </Link>
        </div>

      </nav>

    </>

  )
}

function changePage(path: string, navigate: AppRouterInstance) {
  navigate.push(path)

}


