"use client"
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
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
export default function Main(props: { children: ReactNode, session: any }) {
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
          <SessionProvider session={props.session}>
            <TitleBar room_id={temp.room_id} />
            <main>{props.children}</main>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}




