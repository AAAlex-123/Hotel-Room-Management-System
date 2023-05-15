import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Helmet} from "react-helmet";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';


export const Login =() =>{
  const navigate= useNavigate()

  const [username, setUsername] = useState<string>("");
  const [pass, setPassword] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const response=await fetch(`http://host.docker.internal:8081/api/auth`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, pass}),
})

    event.preventDefault();
    navigate("/main");

  }


  return (
    <>
    <Helmet>
      <title> Login | User </title>
      <link rel="icon" href="../../public/favicon.ico" />
    </Helmet>
    <div className="Login">

  <Form onSubmit={handleSubmit}>

  <Form.Group controlId="username">
    <Form.Label>Username</Form.Label>
    <Form.Control autoFocus type="string" value={username} onChange={(e) => setUsername(e.target.value)}/>
  </Form.Group>

  <Form.Group controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={pass} onChange={(e) => setPassword(e.target.value)}/>
  </Form.Group>

  <Button type="submit" >

    Login

  </Button>

</Form>

</div>
    
    
    </>

    
    
    
  );
}

export default Login;
