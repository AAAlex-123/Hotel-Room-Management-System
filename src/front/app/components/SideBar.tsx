"use client"
import React from 'react'
import { NextRouter, Router, useRouter } from 'next/router';

export default function SideBar() {

  const navigate = useRouter()
  return (
    <>
      <nav>
        <ul className="nav-list">
          <li onClick={() => changePage('/reservations', navigate)}>Reservations</li>
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

function changePage(path: string, navigate: NextRouter) {
  navigate.push(path)

}


