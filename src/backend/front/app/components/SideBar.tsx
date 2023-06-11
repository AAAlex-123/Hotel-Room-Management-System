"use client"
import React from 'react'
import './Component.css';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import Link from 'next/link';

export default function SideBar() {
  const router = useRouter()
  return (
    <>
      <nav>
        <div className="nav-list">
          <div onClick={() => changePage('/reservations', router)}>Reservartions</div>
          <div onClick={() => changePage('/front desk', router)}>Front Desk</div>
          <div onClick={() => changePage('/arrivals', router)}>Arrivals</div>
          <div onClick={() => changePage('/room', router)}>Room Management</div>
          <div onClick={() => changePage('/cashiering', router)}>Cashiering</div>
          <div onClick={() => changePage('/misc', router)}>Miscellaneous</div>
          <Link href='/'>
            <button className="blueButton" type="submit">
              Exit
            </button>
          </Link>
        </div>
      </nav>
    </>
  )
}

function changePage(path: string, router: AppRouterInstance) {
  router.push(path)

}


