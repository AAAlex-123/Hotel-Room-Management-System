"use client"
import { useNavigate } from "react-router-dom";
import "./TitleBar.css";
export default function TitleBar(props: {
  room_id: string;
}) {
  const push = useNavigate()

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
          <img alt={"exit button"} src="/Assets/Back_button.png"></img>
        </button>
      </div>
    </div>
  );
}
