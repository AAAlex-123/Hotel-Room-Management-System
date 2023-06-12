import React from 'react';
import { Charge } from './Charge';

interface ChargeInfoProps {
  charge: Charge;
}

const ChargeInfo: React.FC<ChargeInfoProps> = ({ charge }) => {
  return (
    <div className='chargeInfo' >
      <p className='c1'>Description: {charge.description}</p>
      <p className='c3'>Date: {String(charge.timestamp)}</p>
      <p className='c4'>Amount: {charge.type==="CHARGE"?charge.amount:-charge.amount}$</p>
    </div>
  );
}

export default ChargeInfo;

