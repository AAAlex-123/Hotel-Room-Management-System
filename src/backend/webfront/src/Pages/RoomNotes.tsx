"use client"
import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import { Link } from 'react-router-dom';
import NoteOrderList, { MessageData } from '../Components/NoteOrderList';
import { Helmet } from 'react-helmet';
import { NoteEntity } from '../Components/NoteOrders';

const RoomNotes: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const label = 'Room Notes';

  const [messages, setMessages] = useState<MessageData[]>([]);
  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/note`, { headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        const unfiltered: NoteEntity[] = await response.json()
        unfiltered.forEach(value => {
          value.created = new Date(value.created);
        })
        const notes: MessageData[] = unfiltered.map(value => ({ note: value }))
        setMessages(notes)
      }
    }
    hey().catch(console.error)
  }, [])
  const handleDeleteMessage = async (message: MessageData) => {
    if (message.note) {
      const response = await fetch(`${url}/note/${message.note.note_id}`, { method: "DELETE", headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        setMessages(prevmessages => prevmessages.filter(m => m !== message));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Room Notes</title>
      </Helmet>
      <div><Layout /> </div>
      <div>
        <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <NoteOrderList messages={messages} onDeleteMessage={handleDeleteMessage} />
            <Link to="/maid">
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
