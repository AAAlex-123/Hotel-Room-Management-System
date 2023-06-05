"use client"
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
export default function Main(props: { children: ReactNode,session:any }) {
  return (
    <section>
      <SessionProvider session={props.session}>
        {props.children}
      </SessionProvider>
    </section>
  )
}




