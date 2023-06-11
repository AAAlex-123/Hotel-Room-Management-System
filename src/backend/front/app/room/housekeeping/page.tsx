"use client"
import Layout from '../../components/Layout'
import SmallScreen from '../../components/SmallScreen'
import React, { useEffect, useState } from 'react';
import Filter from '../../components/Filter';
import RoomList from '../../components/RoomList';
import Link from 'next/link';
import Head from 'next/head';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';
import { Room, Status } from '@/app/components/Room';
import { log } from 'console';

async function Housekeeping() {
  const label = 'Housekeeping';
  const [filterOptions, setFilterOptions] = useState<Partial<Room>>({});
  const { push, refresh } = useRouter()
  const x = useSearchParams()
  const url = process.env.NEXT_PUBLIC_URL;
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const r_body = await fetch(`${url}/room`, {
    cache: "no-cache",
    headers: { authorization: `Bearer ${token}` }
  })
  if (!r_body.ok) {
    push("/room")
  }
  const rooms: Room[] = await r_body.json()


  const handleFilter = (filter: Partial<Room>) => {
    setFilterOptions(filter);
  };

  const handleStatusChange = async (room: Room, selectedStatus: Status) => {
    const pPut = await fetch(`${url}/room/${room.room_id}`, {
      cache: "no-cache",
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...room, clean_state: selectedStatus })
    })
    if (!pPut.ok) alert("Could not update function")
    else refresh()
  };


  return (
    <>
      <Head>
        <title>Housekeeping</title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee?.name ?? ""} /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <Filter onFilter={handleFilter} />
            <RoomList rooms={rooms} filters={filterOptions} onStatusChange={handleStatusChange} />
            <Link href='/maid'>
              <button className="blueButton" type="submit">
                Close
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Housekeeping;