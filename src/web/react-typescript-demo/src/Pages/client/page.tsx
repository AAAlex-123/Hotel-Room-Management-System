"use client";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Login.css";
const imageStyle = {
  textAlign: "center" as const,
  width: "100%",
};

export default function LogicClient() {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const room_id = searchParams.get("room_id")
  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await fetch(`${url}/auth/client`, {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ login: e.target.cellphone.value, room_id })
    })
    const client = await res.json()
    localStorage.setItem("reservation_id", client.reservation_id)
    localStorage.setItem("token", client.access_token)
    navigate("/client/menu?room_id=" + room_id)
  };



  return (
    <div className="Login">
      <div className="Box">
        <form className="form-field" onSubmit={handleSubmit}>
          <img style={imageStyle} src={"/Assets/logo.png"} alt={"logo"}></img>
          <input className="form-field-wrapper" type="text" id="cellphone" placeholder="6 digits from cellphone" />
          <button className="blueButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
