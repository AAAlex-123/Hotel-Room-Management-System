"use client"
import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import React, { useState, useEffect} from 'react';
import { ReservationClientEntity, ReservationReturn, ChargeType } from '../Components/ReservationTypes';
import { Link } from 'react-router-dom';
import ResForm from '../Components/ResForm';

const UpdateReservation: React.FC = () => {
    const titles = ['Room Number', 'Arrival', 'Departure', 'Name', "Cellphone", 'City', 'Country', 'Address', 'Postcode', 'Visitors','E-mail', 'Bill' ];
    const titles2= ['Room Number', 'Name', 'Cellphone' ]
    const elem = 12;
    const text= "Close";
    const text2= 'Update';
    const label= 'Update Reservation';

    const [reservations, setReservations] = useState<ReservationReturn[]>([
      {
        reservation_id: 1,
        room_id: 'O63',
        arrival: new Date('2023-05-29'),
        departure: new Date('2023-05-31'),
        name: 'Minako Arisato',
        cellphone: '+81 32 8049 3201',
        city: '',
        country: '',
        address: '',
        postcode: '',
        visitor: 4,
        email: 'minakoaris@gmail.com',
        Charge: [
          {
            timestamp: new Date("2023-05-25"),
            description: "Room Charge",
            amount: 200,
            type: ChargeType.CREDIT,
          },
          {
            timestamp: new Date("2023-05-29"),
            description: 'Credit refund',
            amount: 50,
            type: ChargeType.CREDIT,
          },
        ],
      },
      {
        reservation_id: 2,
        room_id: 'O65',
        arrival: new Date('2023-05-29'),
        departure: new Date('2023-05-31'),
        name: 'Electra Papadopoulou',
        cellphone: '+30 2109644638',
        city: 'Athens',
        country: 'Greece',
        address: 'Iasonidou',
        postcode: '16777',
        visitor: 1,
        email: 'electra@gmail.com',
        Charge: [
          {
            timestamp: new Date("2023-05-23"),
            description: "Room Charge",
            amount: 400,
            type: ChargeType.CREDIT,
          },
          {
            timestamp: new Date("2023-05-29"),
            description: 'Pool Usage',
            amount: 15,
            type: ChargeType.CHARGE,
          },
        ],
      },
    ]);


    const [showDetails, setShowDetails] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState<(ReservationReturn | null)[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<ReservationReturn | null>(null);
    const [originalReservations, setOriginalReservations] = useState<ReservationReturn[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedReservation, setUpdatedReservation] = useState<ReservationClientEntity | null>(null);


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
      setIsUpdating(false); 
      setUpdatedReservation(null); 
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

  const handleUpdateReservation = (updatedData: ReservationClientEntity) => {
    if (!selectedReservation) {
      return;
    }
  
    const updatedReservation: ReservationReturn = {
      ...selectedReservation,
      room_id: updatedData.room_id !== selectedReservation.room_id ? updatedData.room_id : selectedReservation.room_id,
      arrival: updatedData.arrival !== selectedReservation.arrival ? updatedData.arrival : selectedReservation.arrival,
      departure: updatedData.departure !== selectedReservation.departure ? updatedData.departure : selectedReservation.departure,
      name: updatedData.name !== selectedReservation.name ? updatedData.name : selectedReservation.name,
      cellphone: updatedData.cellphone !== selectedReservation.cellphone ? updatedData.cellphone : selectedReservation.cellphone,
      city: updatedData.city !== undefined ? updatedData.city : selectedReservation.city,
      country: updatedData.country !== undefined ? updatedData.country : selectedReservation.country,
      address: updatedData.address !== undefined ? updatedData.address : selectedReservation.address,
      postcode: updatedData.postcode !== undefined ? updatedData.postcode : selectedReservation.postcode,
      visitor: updatedData.visitor !== undefined ? updatedData.visitor : selectedReservation.visitor,
      email: updatedData.email !== undefined ? updatedData.email : selectedReservation.email,
      Charge: selectedReservation.Charge, 
    };
  
  
    const reservationIndex = reservations.findIndex(reservation => reservation.reservation_id === selectedReservation.reservation_id);
  
    if (reservationIndex !== -1) {
      const updatedReservations = [...reservations];
      updatedReservations[reservationIndex] = updatedReservation;
  

      setReservations(updatedReservations);
    }

    setSelectedReservation(null);
    setIsUpdating(false);
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
      const totalAmount = reservation.Charge.reduce((sum, charge) => sum + charge.amount, 0);
      content.push(totalAmount.toString());
    }

    return content;
  };

  const content = getContentFromSearchResult(selectedReservation);




    return (
      <>
              {/* <Head>
          <title>Update Reservation</title>
      </Head> */}
      <div><Layout 
      // title={'Update Reservation'}
      /> </div>
      <div> <SmallScreen label={label}/>
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
        
       
    
                {showDetails && selectedReservation && !isUpdating ? (
            <Details
              titles={titles}
              content={content}
              elem={elem}
              text={text}
              text2={text2}
              onClose={closeDetails}
              onButtonClick={() => setIsUpdating(true)} 
            />
          ) : null}

          {isUpdating && selectedReservation ? (
            <ResForm
              onSubmit={handleUpdateReservation} initialData={selectedReservation}
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


            <Link to="/reservations">
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
export default UpdateReservation;