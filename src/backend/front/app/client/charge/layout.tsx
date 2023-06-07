"use client"
import React, { ReactNode } from 'react'
export default function Main(props: { children: ReactNode }) {
  return (
    <section>
      {props.children}
    </section>
  )
}




