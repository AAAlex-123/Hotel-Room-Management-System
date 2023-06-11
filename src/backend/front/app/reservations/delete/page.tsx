"use client"
import Layout from '../../components/Layout'
import Details from '../../components/Details';
import SmallScreen from '../../components/SmallScreen'
import React, { useState, useEffect } from 'react';
import { ReservationClientEntity } from '../../components/ReservationTypes';
import Link from 'next/link';
import Head from 'next/head';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';

async function DeleteReservation() {
  const titles = ['Room Number', 'Arrival', 'Departure', 'Name', "Cellphone", 'City', 'Country', 'Address', 'Postcode', 'Visitors', 'E-mail'];
  const titles2 = ['Room Number', 'Name', 'Cellphone',]
  const elem = 11;
  const text = "Close";
  const text2 = 'Delete';
  const label = 'Delete Reservation';
  const x=useSearchParams()
  const [reservations, setReservations] = useState<ReservationClientEntity[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<(ReservationClientEntity | null)[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationClientEntity | null>(null);
  const [originalReservations, setOriginalReservations] = useState<ReservationClientEntity[]>([]);
  const { push } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const url = process.env.NEXT_PUBLIC_URL;
  const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const r_body = await fetch(`${url}/reservation`, { cache: "no-cache", headers: { authorization: "Bearer " + token } })
  if (!r_body.ok) {
    push("/reservations")
  }
  setOriginalReservations(reservations);
  setReservations(await r_body.json())
  const handleSearch = async () => {
    const filteredResults = reservations.filter(
      (reservation) =>
        reservation.name.toLowerCase().includes(searchText.toLowerCase()) ||
        reservation.cellphone.includes(searchText)
    );
    setSearchResult(filteredResults.length > 0 ? filteredResults : [null]);
    setShowDetails(false);

  };

  const openDetails = (reservation: ReservationClientEntity) => {
    setSelectedReservation(reservation);
    setShowDetails(true);
    setSearchResult([]);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSearchResult(originalReservations);
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getContentFromSearchResult = (reservation: ReservationClientEntity | null): string[] => {
    const content: string[] = [];
    if (reservation) {
      content.push(reservation.room_id);
      content.push(reservation.arrival.toDateString());
      content.push(reservation.departure.toDateString());
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
  return (
    <>
      <Head>
        <title>Delete Reservation</title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee?.name ?? ""} /></div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <div className="bar-container">
              <div className="search-container">
                <form action="#" onSubmit={handleSearch}>
                  <label>Name/Cellphone: </label>
                  <input
                    type="text"
                    defaultValue={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button type="submit">Search</button>
                </form>
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


            <Link href="/reservations">
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
export default DeleteReservation;