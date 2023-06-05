"use client"
import { useRouter } from "next/navigation";
import "./page.module.css";
import "./Login.css";
import { FormEvent, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { signIn } from "next-auth/react";
export default async function Login() {
  const imageStyle = {
    textAlign: "center" as const,
    // marginBottom: '20px',
    width: "100%",
    // height: 'auto',
  };

  const [login, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const handleSubmit = async (e: FormEvent) => {
    signIn("employee", {
      username: login,
      password,
      redirect: false,
      callbackUrl: "/main"
    })
  }

  return (
    <main>
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
          <Image src="./Assets/logo.png" alt="Logo" style={imageStyle} />
          <form className="form-field" onSubmit={handleSubmit} action="#">
            <input type="text" autoFocus placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={login} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="bluebutton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </main >
  );
}
