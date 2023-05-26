import React from 'react'
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: "Main Menu",
}
export default function Main({ children, }: { children: React.ReactNode; }) {

  const imageStyle = {
    textAlign: 'center' as const,
    marginBottom: '1rem',
    padding: '1rem',
    width: '10rem',
    height: 'auto',

  };

  return (
    <>
      <Head>
        <title> Main Menu </title>
        <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet' />
        <style>{`
        * {
            font-family: 'Aleo';font-size: 1rem;
        }
      `}</style>
      </Head>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  )
}




