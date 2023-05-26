"use client";
import Head from "next/head";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default async function LogicClient() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "Username"
  const client_id = searchParams.get("client_id")
  if (client_id!==undefined){
    notFound()
  }
  const navigate = useRouter();
  const clientData=await fetch(`http://host.internal.docker:8081/api/client/${client_id}`,{cache:"no-store"})

  function handleCheckout() {
    //TODO-[25/05/2023]: 
  }

  function handleAbsence() {
    //TODO-[25/05/2023]: Add absense hook
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
        <Link href="tel://6900000000">
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
