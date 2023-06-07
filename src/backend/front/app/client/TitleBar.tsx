"use client"
import { useRouter } from "next/navigation";
import "./TitleBar.css";
import Image from "next/image";
export default function TitleBar(props: {
  room_id: string;
}) {
  const { push } = useRouter()

  function handleOut(event: any) {
    event.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("reservation_id")
    push(`/client?room_id=${props.room_id}`)
  }

  return (
    <div className="TitleLayout">
      <h3 className="RoomName">
        {props.room_id}
      </h3>
      <div className="ReturnButton">
        <button onClick={handleOut}>
          <Image width={50} height={50} alt={"exit button"} src="/Assets/Back_button.png"></Image>
        </button>
      </div>
    </div>
  );
}
