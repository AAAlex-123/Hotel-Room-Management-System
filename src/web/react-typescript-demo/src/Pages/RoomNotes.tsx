"use client"
import React, { useState } from 'react'
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import { Link } from 'react-router-dom';
import NoteOrderList, {MessageData} from '../Components/NoteOrderList';

const RoomNotes: React.FC = () => {
  const label = 'Room Notes';

  const [messages, setMessages] = useState<MessageData[]>([
    { note: { note_id: 1, cleaning_staff_id: 55, note_data: 'First note', created: new Date('2023-05-30'), room_id: '101' } },
    { note: { note_id: 2, cleaning_staff_id: 47, note_data: 'Second note', created: new Date('2023-05-31'), room_id: '102' } },
    { note: { note_id: 3, cleaning_staff_id: 43, note_data: 'Third note', created: new Date('2023-06-01'), room_id: '103' } },
  ]);

  const handleDeleteMessage = (message: MessageData) => {
    if (message.note) {
      setMessages(prevMessages => prevMessages.filter(m => m !== message));
    } 
  };

  return (
    <>
            {/* <Head>
          <title>Room Notes</title>
      </Head> */}
        <div><Layout 
        // title={'Room Notes'}
        /> </div>
      <div>
        <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <NoteOrderList messages={messages} onDeleteMessage={handleDeleteMessage} />
            <Link to="/maid-management">
              <button className="blueButton" type="submit">
                Close
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomNotes;
