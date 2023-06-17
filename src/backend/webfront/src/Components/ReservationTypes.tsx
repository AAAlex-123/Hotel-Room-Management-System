"use client"
export enum ChargeType {
    CHARGE= 'CHARGE',
    CREDIT= 'CREDIT',
  }
export enum ReservationStatus{
    FILED='FILED',
    CHECKEDIN='CHECKEDIN',
    CHECKEDOUT='CHECKEDOUT',
}

export interface ReservationReturn  {
    reservation_id: number;
    room_id: string;
    arrival: Date;
    departure: Date;
    name: string;
    checked_status:ReservationStatus;
    cellphone: string;
    city: string;
    country: string;
    address: string;
    postcode: string;
    visitor: number;
    email?: string;
    charge: {
      timestamp: Date;
      description: string;
      amount: number;
      type: ChargeType; 
    }[];
  };

export interface ReservationClientEntity  {
    room_id: string;
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
    bill?: number;
  };