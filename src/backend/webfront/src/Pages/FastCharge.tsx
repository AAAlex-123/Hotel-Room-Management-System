"use client"
import { Helmet } from 'react-helmet';
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const FastCharge: React.FC = () => {
  const label = 'Fast Charge';
  const [searchParams] = useSearchParams()
  const reservation_id = Number(searchParams.get("reservation_id"))
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [type, setType] = useState("CHARGE")


  function handleAmount(event: ChangeEvent<HTMLInputElement>): void {
    setAmount(Number(event.target.value))
  }

  function handleDescription(event: ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value)
  }

  function handleType(event: ChangeEvent<HTMLSelectElement>): void {
    setType(event.target.value)
  }

  const handleCharge = async () => {
    const response = await fetch(`${url}/charge`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ reservation_id, description, amount, type })
    })
    if (response.ok) {
      navigate("/cashiering/billing")
    }
  }
  return (
    <>
      <Helmet>
        <title>Charge</title>
      </Helmet>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <div className='form-column'>
              <div className="form-group">
                <label>Charge Amount:</label>
                <input
                  className="form-field-wrapper"
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={handleAmount}
                  placeholder="amount"
                />
              </div>
              <div>
                <label>Charge Reason:</label>
                <input
                  className="form-field-wrapper"
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleDescription}
                  placeholder="description"
                />
              </div>
              <div>
                <label>Charge Type:</label>
                <select
                  className="form-field-wrapper"
                  name="type"
                  value={type}
                  onChange={handleType}
                >
                  <option value="CHARGE">Charge</option>
                  <option value="CREDIT">Credit</option>
                </select>
              </div>
              <button className='blueBu ftton' onClick={handleCharge} type='submit'>
                Submit</button>
            </div>
            <Link to='/cashiering/billing'>
              <button className="blueButton" type="submit">
                Close
              </button>
            </Link>
          </div>
        </div >
      </div >
    </>

  )

}
export default FastCharge;