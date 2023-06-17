"use client"
import React from 'react';
import {Room, Status} from './Room';


interface RoomListProps {
    rooms: Room[];
    filters: Partial<Room>;
    onStatusChange: (room: Room, selectedStatus: Status) => void;
  }
  
  const RoomList: React.FC<RoomListProps> = ({ rooms, filters, onStatusChange }) => {
    const filteredRooms = rooms.filter((room) => {
        return (
          (filters.room_id ? room.room_id.includes(filters.room_id) : true) &&
          (filters.occupied !== undefined ? room.occupied === filters.occupied : true) &&
          (filters.clean_state !== undefined
            ? room.clean_state === filters.clean_state
            : true) &&
            (filters.service !== undefined ? room.service === filters.service : true) &&
            (filters.out_of_order !== undefined
              ? room.out_of_order === filters.out_of_order
              : true) &&
          (filters.roomType ? room.roomType.includes(filters.roomType) : true) &&
          (filters.roomClass ? room.roomClass.includes(filters.roomClass) : true) &&
          (filters.floor !== undefined ? room.floor === Number(filters.floor) : true)
        );
      });

      


    return (
        <div className='table-container'>
        <h2>Room List</h2>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Occupied</th>
              <th>State</th>
              <th>In Service</th>
              <th>Out of Order</th>
              <th>Type</th>
              <th>Class</th>
              <th>Floor</th>
            </tr>
          </thead>
          <tbody>
          {filteredRooms.map((room) => (
            <tr key={room.room_id}>
              <td>{room.room_id}</td>
              <td>{room.occupied ? 'Yes' : 'No'}</td>
              <td>
                <select
                  value={room.clean_state}
                  onChange={(event) => onStatusChange(room, event.target.value as Status)}
                >
                  <option value={Status.DIRTY}>DIRTY</option>
                  <option value={Status.CLEAN}>CLEAN</option>
                  <option value={Status.PENDING}>PENDING</option>
                </select>
              </td>
            <td>{room.service ? 'Yes' : 'No'}</td>
            <td>{room.out_of_order ? 'Yes' : 'No'}</td>
            <td>{room.roomType}</td>
            <td>{room.roomClass}</td>
            <td>{room.floor}</td>
            </tr>
      ))}
            
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RoomList;