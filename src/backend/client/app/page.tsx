"use client";
import "./Login.css";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
const imageStyle = {
  textAlign: "center" as const,
  width: "100%",
};

export default async function LogicClient() {
  const searchParams = useSearchParams()
  if (!searchParams) notFound()
  const room_id = searchParams.get("room_id") ?? -1
  if (room_id === -1) notFound()



  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await signIn("credentials", {
      cellphone: e.target.cellphone.value,
      room_id,
      redirect:true,
      callbackUrl: `/menu?room_id=${room_id}`
    })
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

