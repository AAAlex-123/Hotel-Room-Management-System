"use client"
import React, { useState } from 'react'
import './phone.css';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import CardInfo from './Components/CardInfo';
import ChargeList from './Components/ChargeList';
import TitleBar from '../TitleBar';

export default async function Phone() {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const room_id = searchParams?.get("room_id")
  const reservation_id = localStorage.getItem("reservation_id")
  const token = localStorage.getItem("token")
  const [cardInfoCompleted, setCardInfoCompleted] = useState(false);
  const url=process.env.NEXT_PUBLIC_URL;
  const res = await fetch(`${url}/reservation/${reservation_id}`, { cache: "no-store", method: "GET", headers: { authorization: `Bearer ${token}` } })
  if (!res.ok) {
    localStorage.removeItem("token")
    localStorage.removeItem("reservation_id")
    push(`/client?room_id=${room_id}`)
  }

  const rest = await res.json()
  if (rest.charge && rest.charge.length === 0) {
    localStorage.removeItem("token")
    localStorage.removeItem("reservation_id")
    push(`/client?room_id=${room_id}`)
  }
  const charges = rest.charge

  charges.forEach((element: { timestamp: string; }) => {
    element.timestamp = new Date(element.timestamp).toISOString().slice(0, 10)
  });

  const totalCharge = charges.reduce((total: any, charge: any) => total + (charge.type === "CHARGE" ? charge.amount : -charge.amount), 0);


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
      <Head>
        <title> Checkout </title>
        <link rel="icon" href="./logo.png" />
      </Head>
      <TitleBar room_id={rest.room_id} />
      <div className='whiteBox'>
        <CardInfo onCardInfoChange={handleCardInfoChange} />
      </div>
      <div>
        <ChargeList charges={charges} />
      </div>
      <div className='charge'>
        <div>Total: {totalCharge}$
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


