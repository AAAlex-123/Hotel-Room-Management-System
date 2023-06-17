"use client"
import React, { Component, useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import { Link } from 'react-router-dom';
import StatBox from '../Components/StatBox';
import MoreStats from '../Components/MoreStats';
import { Helmet } from 'react-helmet';

type Stat = {
  arivals: number;
  departures: number;
  inhouse: number;
  occupied: number;
  perc_occupied: number;
  revenue: number;
  available: number;
  date?: Date;
}

const EndOfDay: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const label = 'End Of Day Statistics';
  const [stats, setStats] = useState<Stat>()

  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/statistics`, { headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        const stat: Stat = await response.json()
        setStats(stat)
      }
    }
    hey().catch(console.error)
  }, [])

  return (
    <>
      <Helmet>
        <title>End Of Day</title>
      </Helmet>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <StatBox
              text1="Arrivals"
              num1={stats?.arivals ?? 0}
              text2="In House"
              num2={stats?.inhouse ?? 0}
              text3="Departures"
              num3={stats?.departures ?? 0} />
            <MoreStats
              text1="Max % Occ."
              num1={`${stats?.perc_occupied??"-"}%`}
              text2="Max Occ."
              num2={stats?.occupied ?? 0}
              text3="Min Avail."
              num3={stats?.available ?? 0}
              money={`${stats?.revenue ?? 0}`} />
            <Link to='/misc'>
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
export default EndOfDay;
