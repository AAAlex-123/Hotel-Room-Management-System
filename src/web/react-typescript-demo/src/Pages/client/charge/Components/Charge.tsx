"use client"
import React from 'react';

export interface Charge{
    timestamp:Date;
    description:string;
    amount:number;
    type:string
}