"use client"
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Components/Filter';
import {Room, Status} from '../Components/Room';
import RoomList from '../Components/RoomList';

const Housekeeping: React.FC = () => {
  const url=process.env.REACT_APP_URL
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const label= 'Housekeeping';
  const [rooms, setRooms] = useState<Room[]>([
    {
      room_id: '101',
      occupied: true,
      cleaning_state: Status.DIRTY,
      service: true,
      out_of_order: false,
      roomType: 'Single',
      roomClass: 'Standard',
      floor: 1,
    },
    {
      room_id: '102',
      occupied: false,
      cleaning_state: Status.CLEAN,
      service: true,
      out_of_order: false,
      roomType: 'Double',
      roomClass: 'Deluxe',
      floor: 2,
    },
    {
      room_id: '103',
      occupied: true,
      cleaning_state: Status.INSPECTED,
      service: false,
      out_of_order: true,
      roomType: 'Single',
      roomClass: 'Standard',
      floor: 1,
    },
    {
      room_id: '122',
      occupied: true,
      cleaning_state: Status.INSPECTED,
      service: false,
      out_of_order: true,
      roomType: 'Single',
      roomClass: 'Standard',
      floor: 1,
    },
    
    
  ]);

  
  const [filterOptions, setFilterOptions] = useState<Partial<Room>>({});


  const handleFilter = (filter: Partial<Room>) => {
    setFilterOptions(filter);
  };

  const handleStatusChange = (room: Room, selectedStatus: Status) => {
    const updatedRooms = rooms.map((r) => {
      if (r.room_id === room.room_id) {
        return {
          ...r,
          cleaning_state: selectedStatus,
        };
      }
      return r;
    });

    setRooms(updatedRooms);
  };
  

    return (
      <>
              {/* <Head>
          <title>Housekeeping</title>
      </Head> */}
      <div><Layout 
      // title={'Housekeeping'}
      /> </div>
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
      <Filter onFilter={handleFilter} />
          <RoomList rooms={rooms} filters={filterOptions} onStatusChange={handleStatusChange}/>
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