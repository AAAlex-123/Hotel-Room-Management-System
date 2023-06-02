import Link from "next/link";
import "./TitleBar.css";
export default function TitleBar(props: {
  room_id: string;
  client_id: number;
}) {
  return (
    <div className="TitleLayout">
        <h3 className="RoomName">
          {props.room_id}
        </h3>
      <div className="ReturnButton">
        <Link href={`/client/login/${props.room_id}`}>
        <img src="/Assets/Back_button.png" />
        </Link>
      </div>
    </div>
  );
}
