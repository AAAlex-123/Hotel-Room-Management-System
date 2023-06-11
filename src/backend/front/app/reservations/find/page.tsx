"use client"
import Layout from '@/app/components/Layout'
import Details from '@/app/components/Details';
import SmallScreen from '@/app/components/SmallScreen'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';
import { ReservationReturn } from '@/app/components/ReservationTypes';

async function FindReservation() {
  const titles = ['Room Number', 'Arrival', 'Departure', 'Name', "Cellphone", 'City', 'Country', 'Address', 'Postcode', 'Visitors', 'E-mail'];
  const titles2 = ['Room Number', 'Name', 'Cellphone',]
  const elem = 11;
  const text = "Close";
  const label = 'Find Reservation';
  const x=useSearchParams()
  const [showDetails, setShowDetails] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<(ReservationReturn | null)[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationReturn | null>(null);
  const [originalReservations, setOriginalReservations] = useState<ReservationReturn[]>([])
  const { push, refresh } = useRouter()
  const [name, setName] = useState<String>("");
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const url = process.env.NEXT_PUBLIC_URL;
  const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/reservations")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const get = await fetch(`${url}/reservation`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  if (!get.ok) {
    push("/reservations")
  }
  const reservations: ReservationReturn[] = await get.json()
  setOriginalReservations(reservations);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value)

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
    refresh()
  };


  const getContentFromSearchResult = (reservation: ReservationReturn | null): string[] => {
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
        <title>Find Reservation</title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee?.name ?? ""} /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <div className="bar-container">
              <div className="search-container">
                <form action="#" onSubmit={(e) => {
                  e.preventDefault()
                  handleSearch(e)
                }}>

                  <label>Name/Cellphone: </label>
                  <input
                    type="text"
                    defaultValue={searchText}
                  />
                  <button className="blueButton" type="submit">Search</button>
                </form>
              </div>
            </div>



            {showDetails && selectedReservation ? (
              <Details
                titles={titles}
                content={content}
                elem={elem}
                text={text}
                text2={null}
                onClose={closeDetails}
              />
            ) : (
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
                    {reservations
                      .filter(
                        (reservation) =>
                          reservation.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          reservation.cellphone.includes(searchText)
                      )
                      .map((reservation, index) => (reservation && (
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
            )}


            <Link href="/reservations">
              <button className="blueButton" type="submit">
                Close
              </button>
            </Link>


          </div>
        </div>
      </div >
    </>

  )

}
export default FindReservation;