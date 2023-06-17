"use client"
import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import React, { useState, useEffect } from 'react';
import { ReservationReturn, ReservationStatus } from '../Components/ReservationTypes';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { resolveProjectReferencePath } from 'typescript';

const CheckOut: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const titles = ['Room Number', 'Arrival', 'Departure', 'Name', "Cellphone", 'City', 'Country', 'Address', 'Postcode', 'Visitors', 'E-mail', 'Bill'];
  const titles2 = ['Room Number', 'Name', 'Cellphone',]
  const elem = 12;
  const text = "Close";
  const text2 = 'Check Out ->';
  const label = 'Check Out';

  const [reservations, setReservations] = useState<ReservationReturn[]>([]);

  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/reservation`, { headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        let reservations: ReservationReturn[] = await response.json()
        reservations = reservations.filter(value => value.checked_status === ReservationStatus.CHECKEDIN)
        setReservations(reservations)
      }
    }
    hey().catch(console.error)
  }, [])


  const [showDetails, setShowDetails] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<(ReservationReturn | null)[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationReturn | null>(null);
  const [originalReservations, setOriginalReservations] = useState<ReservationReturn[]>([]);
  const handleSearch = async () => {
    const response = await fetch(`${url}/reservation`, { headers: { authorization: `Bearer ${token}` } })
    if (response.ok) {
      let reservations: ReservationReturn[] = await response.json()
      reservations = reservations.filter(value => value.checked_status === ReservationStatus.CHECKEDIN)

      const filteredResults = reservations.filter(
        (reservation) =>
          reservation.name.toLowerCase().includes(searchText.toLowerCase()) ||
          reservation.cellphone.includes(searchText)
      );

      setReservations(reservations)
      setSearchResult(filteredResults.length > 0 ? filteredResults : [null]);
      setShowDetails(false);
    }
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

  const getContentFromSearchResult = (reservation: ReservationReturn | null): string[] => {
    const content: string[] = [];

    if (reservation) {
      content.push(reservation.room_id);
      content.push(new Date(reservation.arrival).toDateString());

      content.push(new Date(reservation.departure).toDateString());
      content.push(reservation.name);
      content.push(reservation.cellphone);
      content.push(reservation.city || '');
      content.push(reservation.country || '');
      content.push(reservation.address || '');
      content.push(reservation.postcode || '');
      content.push(reservation.visitor?.toString() || '');
      content.push(reservation.email || '');
    }
    return content;
  };

  const content = getContentFromSearchResult(selectedReservation);

  const handleCheckIn = async () => {
    if (selectedReservation) {
      const response = await fetch(`${url}/client/checkout`,
        {
          headers: { authorization: `Bearer ${token}`, "Content-Type": 'application/json' },
          method: "POST",
          body: JSON.stringify({ reservation_id: selectedReservation.reservation_id })
        })
      if (response.ok) {
        const updatedReservations = reservations.filter((reservation) => reservation !== selectedReservation);
        setReservations(updatedReservations);

        setSelectedReservation(null);
        setShowDetails(false);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Check Out</title>
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
              <Details
                titles={titles}
                content={content}
                elem={elem}
                text={text}
                text2={text2}
                onClose={closeDetails}
                onButtonClick={handleCheckIn}
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
export default CheckOut;