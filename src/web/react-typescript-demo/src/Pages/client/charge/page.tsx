"use client"
import React, { useEffect, useState } from 'react'
import './phone.css';
import CardInfo from './Components/CardInfo';
import ChargeList from './Components/ChargeList';
import TitleBar from '../TitleBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ClientCharge() {
  const push = useNavigate()
  const [searchParams] = useSearchParams()
  const room_id = searchParams?.get("room_id")
  const [cardInfoCompleted, setCardInfoCompleted] = useState(false);
  const [charges, setCharge] = useState([]);
  const [total, setTotal] = useState(0);
  const reservation_id = localStorage.getItem('reservation_id')
  const token = localStorage.getItem('token')
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    async function hey() {
      const res = await fetch(`${url}/reservation/${reservation_id}`, { method: "GET", headers: { authorization: `Bearer ${token}` } })
      if (!res.ok) {
        localStorage.removeItem("token")
        localStorage.removeItem("reservation_id")
        push(`/client?room_id=${room_id}`)
      }

      const rest = await res.json()
      if (rest.charge && rest.charge.length === 0) {
        push(`/client?room_id=${room_id}`)
      }
      const charges = rest.charge
      charges.forEach((element: { timestamp: string; }) => {
        element.timestamp = new Date(element.timestamp).toISOString().slice(0, 10)
      });
      setCharge(charges)
      const totalCharge = charges.reduce((total: any, charge: any) => total + (charge.type === "CHARGE" ? charge.amount : -charge.amount), 0);
      setTotal(totalCharge)
    }
    hey().catch(console.error)
  })




  const handleCardInfoChange = (completed: boolean) => {
    setCardInfoCompleted(completed);
  };

  const handleChargeButton = async () => {
    if (cardInfoCompleted) {
      await fetch(`${url}/client/checkout/`, { cache: "no-cache", headers: { authorization: `Bearer ${token}`, "Content-type": "application/json" }, method: "POST", body: JSON.stringify({ reservation_id }) })
      localStorage.removeItem("token")
      localStorage.removeItem("reservation_id")
      push(`/client?room_id=${room_id}`)
    }
  };


  return (
    <>
      <Helmet>
        <title> Checkout </title>
        <link rel="icon" href="./logo.png" />
      </Helmet>
      <TitleBar room_id={room_id ?? "-1"} />
      <div className='whiteBox'>
        <CardInfo onCardInfoChange={handleCardInfoChange} />
      </div>
      <div>
        <ChargeList charges={charges} />
      </div>
      <div className='charge'>
        <div>Total: {total}$
        </div>
        <button onClick={handleChargeButton} disabled={!cardInfoCompleted}>
          Charge
        </button >
      </div>
      <footer>
      </footer>
    </>
  );
}


