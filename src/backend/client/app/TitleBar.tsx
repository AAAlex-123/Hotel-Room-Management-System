"use client"
import "./TitleBar.css";
import { signOut } from "next-auth/react";
import Image from "next/image";
export default function TitleBar(props: {
  room_id: string;
}) {

  function handleOut(event: any) {
    event.preventDefault()
    signOut({ callbackUrl: `/client/login/${props.room_id ?? "1"}` })
  }

  return (
    <div className="TitleLayout">
      <h3 className="RoomName">
        {props.room_id}
      </h3>
      <div className="ReturnButton">
        <button onClick={handleOut}>
          <Image width={100} height={100} alt={"exit button"} src="/Assets/Back_button.png"></Image>
        </button>
      </div>
    </div>
  );
}
