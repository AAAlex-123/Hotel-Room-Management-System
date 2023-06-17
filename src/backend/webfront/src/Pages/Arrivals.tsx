import Layout from '../Components/Layout'
import Details from '../Components/Details';
import SmallScreen from '../Components/SmallScreen'
import React, { useState, useEffect, useMemo } from 'react';
import { ReservationReturn, ChargeType } from '../Components/ReservationTypes';
import { Link } from 'react-router-dom';

const Arrivals: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const titles = ['Room Number', 'Arrival', 'Departure', 'Name', "Cellphone", 'City', 'Country', 'Address', 'Postcode', 'Visitors', 'E-mail', 'Bill'];
  const titles2 = ['Room Number', 'Name', 'Cellphone',]
  const elem = 12;
  const text = "Close";
  const label = 'Arrivals';

  const [arrivals, setArrivals] = useState<ReservationReturn[]>([]);



  const [showDetails, setShowDetails] = useState(false);
  const [searchResult, setSearchResult] = useState<(ReservationReturn | null)[]>([]);
  const [selectedArrival, setSelectedArrival] = useState<ReservationReturn | null>(null);
  const [originalArrivals, setOriginalArrivals] = useState<ReservationReturn[]>([]);
  const [searchDate, setSearchDate] = useState<Date | null>(null);

  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/reservation/arrivals/${searchDate ? searchDate.toISOString() : new Date().toISOString()}`, {
        headers: { authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const res: ReservationReturn[] = await response.json()
        setArrivals([...res])
      }
    }
    hey().catch(console.error)
  }, [])

  const handleSearch = async () => {
    const response = await fetch(`${url}/reservation/arrivals/${searchDate?.toISOString()}`, {
      headers: { authorization: `Bearer ${token}` }
    })
    if (response.ok) {
      const res: ReservationReturn[] = await response.json()
      setArrivals([...res])
    }
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
      content.push(new Date(arrival.arrival).toDateString());
      content.push(new Date(arrival.departure).toDateString());
      content.push(arrival.name);
      content.push(arrival.cellphone);
      content.push(arrival.city || '');
      content.push(arrival.country || '');
      content.push(arrival.address || '');
      content.push(arrival.postcode || '');
      content.push(arrival.visitor?.toString() || '');
      content.push(arrival.email || '');
      const totalAmount = arrival.charge.reduce((sum, charge) => sum + charge.amount, 0);
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
