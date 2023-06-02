import React from 'react'
import Head from 'next/head';
import { Inter } from 'next/font/google';
import TitleBar from './TitleBar';
const temp = {
  room_id: "001",
  username: "Scarapussy",
  client_id: 1
}
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: "Main Menu",
}
export default function Main(props: any) {
  return (
    <>
      <Head>
        <title> Main Menu </title>
        {/* <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet' /> */}
        <style>{`
        * {
            font-family: 'Aleo';font-size: 1rem;
        }
      `}</style>
      </Head>
      <html lang="en">
        <body className={inter.className}>
          <TitleBar client_id={temp.client_id} room_id={temp.room_id} />
          <main>{props.children}</main>
        </body>
      </html>
    </>
  )
}




