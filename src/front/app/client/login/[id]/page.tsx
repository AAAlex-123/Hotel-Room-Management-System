"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { FormEvent, useState } from "react";

export default async function LogicClient({
  params,
}: {
  params: { id: string };
}) {
  const navigate = useRouter()

  const imageStyle = {
    textAlign: "center" as const,

    width: "100%",
    height: "auto",
  };

  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate.replace(`/client/menu?client_id=${1}&username=${"mitsos"}&room_id=${"001"}`)
  };
  //   try {
  //     const response = await fetch(`http://host.docker.internal:8081/api/auth`, {
  //       cache:"no-cache",
  //       method:"POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({  }),
  //     })

  //     navigate.push("/main");
  //   } catch (err: any) {
  //     navigate.push("/main");
  //   }

  // }

  return (
    <>
      <Head>
        <title>Client Login</title>
      </Head>
      <div className="Login">
        <div className="Box">
          <Form className="form-field" onSubmit={handleSubmit} action="#">
            <Form.Group controlId="client_id">
              <Form.Control
                className="form-field-wrapper"
                autoFocus
                type="string"
                value={phone}
                placeholder="last 6 digits of reservation phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Button className="blueButton" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
