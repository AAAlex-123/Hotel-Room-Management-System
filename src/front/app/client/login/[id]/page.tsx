"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
// const url ="http://host.docker.internal:8081/api"
const url = "http://localhost:8081/api"
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    signIn("client", {
      phone,
      redirect: false,
      callbackUrl: `/client/menu?room_id=${params.id}`
    })
  };

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
