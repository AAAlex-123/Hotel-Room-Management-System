"use client"
import Link from 'next/link';
import Layout from '../../components/Layout'
import SmallScreen from '../../components/SmallScreen'
import React from 'react';
import Head from 'next/head';

const OutOfOS: React.FC = () => {
  const label = 'Out Of O/S';

  return (
    <>
      <Head>
        <title>Out Of Order/Service</title>
      </Head>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            To be added...

            <Link href='/room'>
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
export default OutOfOS;