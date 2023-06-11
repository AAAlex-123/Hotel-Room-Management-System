import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import React, { useState, useEffect} from 'react';
import { ReservationReturn, ChargeType } from '../Components/ReservationTypes';
import { Link } from 'react-router-dom';

const Arrivals: React.FC = () => {
  const url=process.env.REACT_APP_URL
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const titles = ['Room Number', 'Arrival', 'Departure', 'Name', "Cellphone", 'City', 'Country', 'Address', 'Postcode', 'Visitors','E-mail', 'Bill' ];
  const titles2= ['Room Number', 'Name', 'Cellphone', ]
  const elem = 12;
  const text= "Close";
  const label= 'Arrivals';
  const [arrivals, setArrivals] = useState<ReservationReturn[]>([
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
      ],
    },
  ]);



  const [showDetails, setShowDetails] = useState(false);
  const [searchResult, setSearchResult] = useState<(ReservationReturn | null)[]>([]);
  const [selectedArrival, setSelectedArrival] = useState<ReservationReturn| null>(null);
  const [originalArrivals, setOriginalArrivals] = useState<ReservationReturn[]>([]);
  const [searchDate, setSearchDate] = useState<Date | null>(null);

  const handleSearch = () => {
    const filteredResults = arrivals.filter((arrival) => {
      const arrivalDate = new Date(arrival.arrival);
      if (searchDate && searchDate.getDate() === arrivalDate.getDate()) {
        return true;
      }
      return false;
    });

    setSearchResult(filteredResults.length > 0 ? filteredResults : [null]);
    setShowDetails(false);
  };

  const openDetails = (arrival: ReservationReturn) => {
    setSelectedArrival(arrival);
    setShowDetails(true);
    setSearchResult([]);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSearchResult(originalArrivals);
  };

  useEffect(() => {
    setOriginalArrivals(arrivals);
  }, [arrivals]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getContentFromSearchResult = (arrival: ReservationReturn | null): string[] => {
    const content: string[] = [];

    if (arrival) {
      content.push(arrival.room_id);
      content.push(arrival.arrival.toDateString());
      content.push(arrival.departure.toDateString());
      content.push(arrival.name);
      content.push(arrival.cellphone);
      content.push(arrival.city || '');
      content.push(arrival.country || '');
      content.push(arrival.address || '');
      content.push(arrival.postcode || '');
      content.push(arrival.visitor?.toString() || '');
      content.push(arrival.email || '');
      const totalAmount = arrival.Charge.reduce((sum, charge) => sum + charge.amount, 0);
      content.push(totalAmount.toString());
      
    }

    return content;
  };

  const content = getContentFromSearchResult(selectedArrival);

  return (
    <>
      <div>
        <Layout />
      </div>
      <div>
        <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <div className="bar-container">
              <div className="search-container">
                <label>Arrival Date: </label>
                <input
                  type="date"
                  value={searchDate ? searchDate.toISOString().slice(0, 10) : ''}
                  onChange={(e) => setSearchDate(new Date(e.target.value))}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button className="blueButton" type="button" onClick={handleSearch}>
                Search
              </button>
            </div>

            {showDetails && selectedArrival ? (
              <Details
                titles={titles}
                content={content}
                elem={elem}
                text={text}
                text2={null}
                onClose={closeDetails}
              />
            ) : null}

            {searchResult && searchResult.length > 0 ? (
              <div className="det-table">
                <table>
                  <thead>
                    <tr>
                      {titles2.map((title, index) => (
                        <th key={index}>{title}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {searchResult.map(
                      (arrival, index) =>
                        arrival && (
                          <tr key={index} onClick={() => openDetails(arrival)}>
                            <td>{arrival.room_id}</td>
                            <td>{arrival.name}</td>
                            <td>{arrival.cellphone}</td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}

            <Link to="/main">
              <button className="blueButton" type="submit">
                Close
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Arrivals;
