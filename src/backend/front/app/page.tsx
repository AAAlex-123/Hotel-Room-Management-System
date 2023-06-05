"use client"
import "./Login.css";
import Head from "next/head";
import Image from "next/image";
import { signIn } from "next-auth/react";
export default async function Login() {
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    signIn("employee", {
      username: e.target.login.value,
      password: e.target.password.value,
      redirect: false,
      callbackUrl: "/main"
    })
  }



  return (<>
    <Head>
      <title> Login | User </title>
      <link rel="icon" href="../../public/favicon.ico" />
      <style>{`
               * {
                   font-family: 'Aleo';font-size: 1rem;
               }
             `}
      </style>
    </Head>
    <div className="Login">
      <div className="Box">
        <Image src="/Assets/logo.png" alt="Logo" width={350} height={350}></Image>
        <form className="form-field" onSubmit={handleSubmit} action="#">
          <div className="form-group">
            <input className="form-field-wrapper" type="text" id="login" autoFocus placeholder="Username" />
          </div>
          <div className="form-group">
            <input className="form-field-wrapper" type="password" id="password" placeholder="Password" />
          </div>
          <button className="bluebutton" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  </>
  );
}
