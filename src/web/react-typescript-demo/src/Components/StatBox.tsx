"use client"
import React from 'react';


interface StatElem{
    text1: string; 
    text2: string; 
    text3: string; 
    num1: number;
    num2: number;
    num3: number;
  }


  const StatBox: React.FC<StatElem> = ({ text1, num1, text2, num2, text3, num3}) =>  {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="statBox">
      <div className="small-statBox">
        <p>{text1}</p>
        <p>{num1}</p>
      </div>
      <div className="small-statBox">
        <p>{text2}</p>
        <p>{num2}</p>
      </div>
      <div className="small-statBox">
        <p>{text3}</p>
        <p>{num3}</p>
      </div>
      <div className="date">{currentDate}</div>
    </div>
  );
};

export default StatBox;