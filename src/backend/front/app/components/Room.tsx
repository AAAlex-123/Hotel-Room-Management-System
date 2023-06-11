"use client"
import React from 'react';

export enum Status {
    DIRTY= 'DIRTY',
    CLEAN= 'CLEAN',
    INSPECTED= 'INSPECTED'
  }



export interface Room{
    room_id: string;
    occupied: boolean;
    clean_state: Status;
    service: boolean;
    out_of_order: boolean;
    roomType: string;
    roomClass: string;
    floor: number;

}