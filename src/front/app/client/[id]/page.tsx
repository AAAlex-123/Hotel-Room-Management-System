"use client"
import Head from "next/head";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";


export default LogicClient = ({ params }: { params: { id: string } }) => {
  const navigate = useRouter()

  const imageStyle = {
    textAlign: 'center' as const,
    marginBottom: '20px',
    width: '200px',
    height: 'auto',

  };

  const [phone, setPhone] = useState<string>("");

  const handleSubmit = async () => {
    alert(params.id)
  }
  //   try {
  //     const response = await fetch(`http://host.docker.internal:8081/api/auth`, {
  //       cache:"no-cache",
  //       method:"POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({  }),
  //     })

  //     console.log("HAHAHAHAHA");
  //     navigate.push("/main");
  //   } catch (err: any) {
  //     navigate.push("/main");
  //   }

  // }


  return (
    <>
      <Head>
        <title> Login | Guest </title>
        <link rel="icon" href="../../public/favicon.ico" />
        <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet' />
        <style>{`
        * {
            font-family: 'Aleo';font-size: 1rem;
        }
      `}</style>
      </Head>
      <div className="Login">
        <div className="Box">
          <img src="./Assets/logo.png" alt="Logo" style={imageStyle}></img>

          <Form className="form-field" onSubmit={handleSubmit} action="#">

            <Form.Group controlId="client_id" >
              <Form.Control className="form-field-wrapper" autoFocus type="string" value={phone} placeholder="last 6 digits of reservation phone" onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>

            <Button className="blueButton" type="submit"  >

              Login

            </Button>

          </Form>
        </div>
      </div>


    </>




  );
}
