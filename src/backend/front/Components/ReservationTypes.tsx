"use client"
import React from "react"


export enum ChargeType {
    CHARGE= 'CHARGE',
    CREDIT= 'CREDIT',
  }


export interface ReservationReturn  {
    reservation_id: number;
    room_id: string;
    arrival: Date;
    departure: Date;
    name: string;
    cellphone: string;
    city: string;
    country: string;
    address: string;
    postcode: string;
    visitor: number;
    email?: string;
    Charge: {
      timestamp: Date;
      description: string;
      amount: number;
      type: ChargeType; 
    }[];
  };

export interface ReservationClientEntity  {
    room_id: string[];
    arrival: Date;
    departure: Date;
    name: string;
    cellphone: string;
    city?: string;
    country?: string;
    address?: string;
    postcode?: string;
    visitor?: number;
    email?: string;
  };