"use client";
import Head from "next/head";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default async function LogicClient() {
  const searchParams = useSearchParams()
  if (!searchParams) notFound()
  const username = searchParams.get("username") || "Username"
  const reservation_id = searchParams.get("reservation_id")
  // if (client_id!==undefined){
  //   notFound()
  // }
  const navigate = useRouter();

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
        <Link href="tel:6900000000">
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
