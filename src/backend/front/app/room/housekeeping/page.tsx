"use client"
import Layout from '../../components/Layout'
import SmallScreen from '../../components/SmallScreen'
import React, { useState } from 'react';
import Filter from '../../components/Filter';
import { Room, Status } from '../../components/Room';
import RoomList from '../../components/RoomList';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';

async function Housekeeping() {
  const label = 'Housekeeping';
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const get_res = await fetch(`http://localhost:8081/api/employee/${employee_id}`, { cache: "no-cache", headers: { authrization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const r_body = await fetch("http://localhost:8081/api/room", {
    cache: "no-cache",
    headers: { authorization: `Bearer ${token}` }
  })
  if (!r_body.ok) {
    push("/room")
  }
  const ro: Room[] = await r_body.json()
  const [rooms, setRooms] = useState<Room[]>([]);
  setRooms(ro)
  const [filterOptions, setFilterOptions] = useState<Partial<Room>>({});
  const handleFilter = (filter: Partial<Room>) => {
    setFilterOptions(filter);
  };

  const handleStatusChange = async (room: Room, selectedStatus: Status) => {
    const updatedRooms = rooms.map((r) => {
      if (r.room_id === room.room_id) {
        return {
          ...r,
          cleaning_state: selectedStatus,
        };
      }
      return r;
    });
    const pPut = await fetch(`http://localhost:8081/api/room/${room.room_id}`, {
      cache: "no-cache",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(room)
    })
    if (!pPut.ok) alert("Could not update function")
    else setRooms(updatedRooms);
  };


  return (
    <>
      <Head>
        <title>Housekeeping</title>
      </Head>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <Filter onFilter={handleFilter} />
            <RoomList rooms={rooms} filters={filterOptions} onStatusChange={handleStatusChange} />
            <Link href='/room-management'>
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