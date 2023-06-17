"use client"
import Layout from '../Components/Layout'
import BillDetails from '../Components/BillDetails';
import SmallScreen from '../Components/SmallScreen'
import React, { useState, useEffect } from 'react';
import { ReservationReturn } from '../Components/ReservationTypes';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Billing: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const titles2 = ['Room Number', 'Name', 'Cellphone','Bills']
  const label = 'Billing';
  const [reservations, setReservations] = useState<ReservationReturn[]>([]);

  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/reservation`, { headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        const reservation: ReservationReturn[] = await response.json()
        setReservations(reservation)
      }
    }
    hey().catch(console.error)
  },[])

  const [showDetails, setShowDetails] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<(ReservationReturn | null)[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationReturn | null>(null);
  const [originalReservations, setOriginalReservations] = useState<ReservationReturn[]>([]);
  const handleSearch = () => {
    const filteredResults = reservations.filter(
      (reservation) =>
        reservation.name.toLowerCase().includes(searchText.toLowerCase()) ||
        reservation.cellphone.includes(searchText)
    );

    setSearchResult(filteredResults.length > 0 ? filteredResults : [null]);
    setShowDetails(false);

  };

  const openDetails = (reservation: ReservationReturn) => {
    setSelectedReservation(reservation);
    setShowDetails(true);
    setSearchResult([]);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSearchResult(originalReservations);
  };


  useEffect(() => {
    setOriginalReservations(reservations);
  }, [reservations]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Helmet>
        <title>Billing</title>
      </Helmet>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <div className="bar-container">
              <div className="search-container">
                <label>Name/Cellphone: </label>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            {showDetails && selectedReservation ? (
              <BillDetails
                reservation={selectedReservation}
                onClose={closeDetails}
              />
            ) : null}
            {searchResult && searchResult.length > 0 ? (
              <div className='det-table'>
                <table >
                  <thead>
                    <tr>
                      {titles2.map((title, index) => (
                        <th key={index}>{title}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {searchResult.map((reservation, index) => (reservation && (
                      <tr key={index} onClick={() => openDetails(reservation)}>
                        <td>{reservation.room_id}</td>
                        <td>{reservation.name}</td>
                        <td>{reservation.cellphone}</td>
                        <td><Link to={`/charge?reservation_id=${reservation.reservation_id}`}><button className='blueButton'>Create a Bill</button></Link></td>
                      </tr>
                    )
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <Link to="/cashiering">
              <button className="blueButton" type="submit">
                Close
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>

  )

}
export default Billing;