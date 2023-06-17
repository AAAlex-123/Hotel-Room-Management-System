"use client"
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import './Login.css';



export const Login = () => {
  const navigate = useNavigate()
  const url = window.location.origin+"/api"
  
  const imageStyle = {
    textAlign: 'center' as const,
    marginBottom: '20px',
    width: '200px',
    height: 'auto',

  };

  const [login, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const response = await fetch(`${url}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    })
    if (response.ok) {
      const { employee_id, access_token } = await response.json()
      localStorage.setItem("employee_id", employee_id)
      localStorage.setItem("token", access_token)
      navigate("/main", { replace: true });
    }
  }


  return (
    <>
      <Helmet>
        <title> Login | User </title>
        <link rel="icon" href="../../public/favicon.ico" />
        {/* <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet'/> */}
        <style>
          {`
            @font-face {
              font-family: 'Aleo-Regular';
              src: url('../../public/Assets/Aleo-Regular.ttf') format('truetype');
            }

            * {
              font-family: 'Aleo-Regular';
            }
          `}

        </style>
      </Helmet>
      <div className="Login">
        <div className="Box">
          <img src="./Assets/logo.png" alt="Logo" style={imageStyle}></img>

          <form className="form-field" onSubmit={handleSubmit} action="#">
            <div className="form-group">
              <input
                className="form-field-wrapper"
                autoFocus
                type="string"
                value={login}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                className="form-field-wrapper"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="blueButton" type="submit"  >

              Login

            </button>

          </form>
        </div>
      </div>


    </>




  );
}

export default Login;
