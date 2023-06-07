"use client";
import "./Login.css";
import Image from "next/image";
import { notFound, useRouter, useSearchParams } from "next/navigation";
const imageStyle = {
  textAlign: "center" as const,
  width: "100%",
};

export default async function LogicClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  if (!searchParams) notFound()
  const room_id = searchParams.get("room_id") ?? -1
  if (room_id === -1) notFound()


  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await fetch("http://localhost:8081/api/auth/client", {
      cache: "no-cache",
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ login: e.target.cellphone.value, room_id })
    })
    const client = await res.json()
    console.log(client);
    localStorage.setItem("reservation_id", client.reservation_id)
    localStorage.setItem("token", client.access_token)

    router.push("/client/menu?room_id=" + room_id)
  };



  return (
    <div className="Login">
      <div className="Box">
        <form className="form-field" onSubmit={handleSubmit}>
          <Image style={imageStyle} src={"/Assets/logo.png"} alt={"logo"} width={300} height={300}></Image>
          <input className="form-field-wrapper" type="text" id="cellphone" placeholder="6 digits from cellphone" />
          <button className="blueButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
