"use client"
import React from 'react';


interface StatElem{
    text1: string; 
    text2: string; 
    text3: string; 
    num1: string;
    num2: number;
    num3: number;
    money:string;
  }


  const MoreStats: React.FC<StatElem> = ({ text1, num1, text2, num2, text3, num3, money}) =>  {


  return (
    <div className="statBox">
    <div className="date">Total Revenue: {money}</div>
      <div className="small-statBox2">
        <p>{num1}</p>
        <p>{text1}</p>
      </div>
      <div className="small-statBox2">
        <p>{num2}</p>
        <p>{text2}</p>
      </div>
      <div className="small-statBox2">
        <p>{num3}</p>
        <p>{text3}</p>
      </div>
      
    </div>
  );
};

export default MoreStats;