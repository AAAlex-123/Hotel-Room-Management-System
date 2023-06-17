import React from 'react';
import { Charge } from './Charge';
import ChargeInfo from './ChargeInfo';

interface ChargeListProps {
  charges: Charge[];
}

const ChargeList: React.FC<ChargeListProps> = ({ charges }) => {
  return (
    <div className='chargeList' >
      {charges.map((charge, index) => (
        <ChargeInfo key={index} charge={charge} />
      ))}
    </div>
  );
};

export default ChargeList;
