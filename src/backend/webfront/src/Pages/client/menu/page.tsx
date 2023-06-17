"use client"
import TitleBar from "../TitleBar";
import "../Login.css"
import { useEffect, useState } from "react";
import { type } from "os";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export type ChargeType = {
  timestamp: Date;
  description: string;
  amount: number;
  type: string; //CHARGE or CREDIT
};

export type ReservationEntity = {
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
export type Status = "DIRTY" | "INSPECTED" | "CLEAN"
export type Type = "DAILY" | "DEEP"
export type Room = {
  room_id: string;
  occupied: boolean;
  clean_state: Status;
  service: boolean;
  out_of_order: boolean;
  cleanable: boolean;
  reservation_id: number;
  clean_type: Type;
  roomType: string;
  roomClass: string;
  floor: number;
}
export default function ClientMenu() {

  const [searchParams] = useSearchParams()
  const push = useNavigate()
  const reservation_id = localStorage.getItem("reservation_id")
  const token = localStorage.getItem("token")
  const [num,setNum]=useState(0)
  const [room, setRoom] = useState<Room>()
  const [charge, setCharge] = useState<ChargeType[]>([])
  const [reservation, setReservation] = useState<ReservationEntity>()

  const room_id = searchParams.get("room_id") ?? "001"
  const url = window.location.origin+"/api";
  useEffect(() => {
    async function temp() {
      const reservations_body = await fetch(`${url}/reservation/${reservation_id}?room=true`, { cache: "no-cache", method: "GET", headers: { authorization: `Bearer ${token}` } })
      if (!reservations_body.ok) {
        push("/client?room_id=" + room_id)
      }
      const x = await reservations_body.json()
      const { room, charge, ...reservation } = x as ReservationEntity
      setRoom(room)

      setCharge([...charge])
      setReservation(reservation as ReservationEntity)
    }
    temp().catch(console.error)
  }, [])

  async function handleCheckout() {
    if (charge === undefined) {
      push(`/client?room_id=${room_id}`)
      return
    }
    if (charge.length !== 0 && charge.map(value => (value.type === "CHARGE" ? 1 : -1) * value.amount).reduce((prev, cur) => prev + cur) !== 0) {
      push(`/client/charge?room_id=${room_id}`)
    } else {
      const res = await fetch(`${url}/client/checkout`, { headers: { authorization: `Bearer ${token}`, "Content-type": "application/json" }, method: "POST", body: JSON.stringify({ reservation_id }) })
      if (res.ok) {
        localStorage.removeItem("token")
        localStorage.removeItem("reservation_id")
        push(`/client?room_id=${room_id}`)
      } else {
        push(`/client?room_id=${room_id}`)
      }
    }
  }

  async function handleAbsence() {
    const response = await fetch(`${url}/client/absence`, { headers: { authorization: `Bearer ${token}`, "Content-type": "application/json" }, method: "POST", body: JSON.stringify({ reservation_id, state: !room?.cleanable }) })
    if (response.ok) {
      window.location.reload()
    }
  }

  return (
    <main>
      <Helmet>
        <title>Main Menu</title>
      </Helmet>
      <TitleBar room_id={room_id} />
      <div className="mainFrame">
        <h1>Welcome {reservation?.name}!</h1>
        <h2>How may we be of service?</h2>
        <span><button onClick={e => {
          e.preventDefault()
          handleAbsence()
        }} >{room?.cleanable ? "Return Notification" : "Absence Notification"}</button></span>
        <Link to="tel:+306900000000">
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
