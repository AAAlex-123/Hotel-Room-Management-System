"use client"
import { notFound, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import TitleBar from "../TitleBar";
import { signOut, useSession } from "next-auth/react";
import { stat } from "fs/promises";

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
}
export default async function LogicClient() {
  const searchParams = useSearchParams()
  const { data: session, status } = useSession({required:true})
  if (!searchParams) notFound()
  const room_id = searchParams.get("room_id")
  console.log(status);

  if (!session) signOut({ callbackUrl: "/?room_id=" + room_id })
  const reservation_id = session?.user.reservation_id
  const reservations_body = await fetch(`${process.env.URL}/reservation/${session?.user.reservation_id}?room=true`, { cache: "no-cache", method: "GET", headers: { authorization: `Bearer ${session?.user.access_token}` } })
  const reservation: ReservationEntity = await reservations_body.json()
  const navigate = useRouter();


  async function handleCheckout() {
    await fetch(process.env.URL + "/client/checkout/", { cache: "no-cache", method: "POST", body: JSON.stringify({ reservation_id }) })
  }

  async function handleAbsence() {
    await fetch(process.env.URL + "/client/absent/", { cache: "no-cache", method: "POST", body: JSON.stringify({ reservation_id, state: true }) })

  }

  return (
    <main>
      {/* <Head>
        <title>Main Menu</title>
      </Head> */}
      <TitleBar room_id={reservation.room_id} />
      <div className="mainFrame">
        <h1>Welcome {reservation.name}!</h1>
        <h2>How may we be of service?</h2>
        <span><button onClick={e => {
          e.preventDefault()
          handleAbsence()
        }} >Absence Notification</button></span>
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
