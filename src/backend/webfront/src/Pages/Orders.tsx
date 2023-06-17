import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import SmallScreen from '../Components/SmallScreen';
import { Link, useNavigate } from 'react-router-dom';
import NoteOrderList, { MessageData } from '../Components/NoteOrderList';
import { Helmet } from 'react-helmet';
import { ProvisionEntity } from '../Components/NoteOrders';

const Orders: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const label = 'Orders';
  const navigate = useNavigate()
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/provision`, { headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        const provisions: ProvisionEntity[] = await response.json()
        provisions.forEach(value => {
          value.creation = new Date(value.creation)
        })
        setMessages(provisions.map(value => ({ provision: value })))
      }
    }
    hey().catch(console.error)
  }, [])
  const handleDeleteMessage = async (message: MessageData) => {
    if (message.provision) {
      const response = await fetch(`${url}/provision/${message.provision.provision_id}`, { method: "DELETE", headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        setMessages(prevmessages => prevmessages.filter(m => m !== message));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Orders</title>
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

export default Orders;
