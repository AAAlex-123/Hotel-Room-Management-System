"use client"
import "./Login.css";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default async function Login() {
  const { push, refresh } = useRouter()
  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await fetch("http://localhost:8081/api/auth", {
      cache: "no-cache", method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({
        login: e.target.login.value,
        password: e.target.password.value
      })
    })
    if (!res.ok) refresh()
    const { employee_id, access_token } = await res.json()
    localStorage.setItem("employee_id", employee_id)
    localStorage.setItem("token", access_token)
    push("/main")
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
