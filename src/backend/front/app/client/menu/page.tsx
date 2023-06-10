"use client"
import { notFound, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import TitleBar from "../TitleBar";
import "../Login.css"
import Head from "next/head";

type ChargeType = {
  timestamp: Date;
  description: string;
  amount: number;
  type: string; //CHARGE or CREDIT
};

type ReservationEntity = {
  reservation_id: number;
  room_id: string;
  name: string;
  email: string;
  cellphone: string;
  city: string;
  country: string;
  address: string;
  postcode: string;
  visitor: number;
  arrival: Date;
  departure: Date;
  room: any;
  charge: ChargeType[]
}
export default async function LogicClient() {
  const searchParams = useSearchParams()
  const { push, refresh } = useRouter()
  if (!searchParams) notFound()
  const room_id = searchParams.get("room_id") ?? "001"
  const reservation_id = localStorage.getItem("reservation_id")
  const token = localStorage.getItem("token")

  const reservations_body = await fetch(`http://localhost:8081/api/reservation/${reservation_id}?room=true`, { cache: "no-cache", method: "GET", headers: { authorization: `Bearer ${token}` } })
  if (!reservations_body.ok) {
    push("/client?room_id=" + room_id)
  }
  const { room, charge, ...reservation } = (await reservations_body.json()) as ReservationEntity
  console.log(charge);
  

  async function handleCheckout() {
    if (charge === undefined) {
      refresh()
      return
    }
    if (charge.length !== 0 && charge.map(value => (value.type === "CHARGE" ? 1 : -1) * value.amount).reduce((prev, cur) => prev + cur) !== 0) {
      push(`/client/charge?room_id=${room_id}`)
    } else {
      const res = await fetch("http://localhost:8081/api/client/checkout/", { cache: "no-cache", headers: { authorization: `Bearer ${token}`, "Content-type": "application/json" }, method: "POST", body: JSON.stringify({ reservation_id }) })
      if (!res.ok) {
        refresh()
      } else {
        localStorage.removeItem("token")
        localStorage.removeItem("reservation_id")
        push(`/client?room_id=${room_id}`)
      }
    }
  }

  async function handleAbsence() {
    await fetch("http://localhost:8081/api/client/absence/", { cache: "no-cache", headers: { authorization: `Bearer ${token}`, "Content-type": "application/json" }, method: "POST", body: JSON.stringify({ reservation_id, state: !room.cleanable }) })
    refresh()
  }

  return (
    <main>
      <Head>
        <title>Main Menu</title>
      </Head>
      <TitleBar room_id={room_id} />
      <div className="mainFrame">
        <h1>Welcome {reservation.name}!</h1>
        <h2>How may we be of service?</h2>
        <span><button onClick={e => {
          e.preventDefault()
          handleAbsence()
        }} >{room.cleanable ? "Return Notification" : "Absence Notification"}</button></span>
        <Link href="tel:+306900000000">
          <button>Contact Reception</button>
        </Link>
        <span><button onClick={e => {
          e.preventDefault()
          handleCheckout()
        }}>Checkout</button></span>
      </div>
    </main>
  );
}
