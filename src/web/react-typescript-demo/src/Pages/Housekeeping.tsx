"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Components/Filter';
import { Room, Status } from '../Components/Room';
import RoomList from '../Components/RoomList';

const Housekeeping: React.FC = () => {
  const url = process.env.REACT_APP_URL
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const label = 'Housekeeping';
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/room`, { headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        const x: Room[] = await response.json()
        setRooms(x)
      }
    }
    hey().catch(console.error)
  })

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
    const response = await fetch(`${url}/room/${room.room_id}`, {
      method: "PUT",
      headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ ...room, clean_state: selectedStatus })
    })
    if (response.ok) {
      setRooms(updatedRooms);
    }
  };


  return (
    <>
      {/* <Head>
          <title>Housekeeping</title>
      </Head> */}
      <div><Layout
      // title={'Housekeeping'}
      /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <Filter onFilter={handleFilter} />
            <RoomList rooms={rooms} filters={filterOptions} onStatusChange={handleStatusChange} />
            <Link to='/room-management'>
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