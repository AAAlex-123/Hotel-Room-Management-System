import { Button } from "react-bootstrap";
import "./TitleBar.css";
import { signOut } from "next-auth/react";
export default function TitleBar(props: {
  room_id: string;
}) {
  return (
    <div className="TitleLayout">
      <h3 className="RoomName">
        {props.room_id}
      </h3>
      <div className="ReturnButton">
        <Button onClick={() => signOut({ callbackUrl: `/client/login/${props.room_id ?? "1"}` })}>
          <img src="/Assets/Back_button.png" />
        </Button>
      </div>
    </div>
  );
}
