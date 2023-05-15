import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Helmet} from "react-helmet";


export const Login =() =>{
  return (
    <div>
        <Helmet>
          <title>Login | User </title>
          <link rel="icon" href="%PUBLIC_URL%/logo.png" />
        </Helmet>
      </div>
  );
}

export default Login;
