"use client";
import Head from "next/head";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default async function LogicClient() {
  const searchParams = useSearchParams()
  if (!searchParams) notFound()
  const {data:session}=useSession();
  const room_id = searchParams.get("room_id") ?? "002"
  const reservation_id = searchParams.get("reservatinon_id") ?? -1
  const username = searchParams.get("username") ?? ""
  const navigate = useRouter();
  if(!session) navigate.push("/")

  async function handleCheckout() {
    await fetch("http://host.docker.internal:8081/api/client/checkout/", { cache: "no-cache", method: "POST", body: JSON.stringify({ reservation_id }) })
  }

  async function handleAbsence() {
    await fetch("http://host.docker.internal:8081/api/client/absent/", { cache: "no-cache", method: "POST", body: JSON.stringify({ reservation_id, state: true }) })

  }

  return (
    <>
      <Head>
        <title>Main Menu</title>
      </Head>
      <div className="mainFrame">
        <h1>Welcome {username}!</h1>
        <h2>How may we be of service?</h2>
        <span><Button onClick={e => {
          e.preventDefault()
          handleAbsence()
        }} >Absence Notification</Button></span>
        <Link href="tel:+306900000000">
          <Button>Contact Reception</Button>
        </Link>
        <span><Button onClick={e => {
          e.preventDefault()
          handleCheckout()
        }}>Checkout</Button></span>
      </div>
    </>
  );
}
