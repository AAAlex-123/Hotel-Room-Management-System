import React from 'react'
import './Component.css';


interface ScreenElem {
    label: string;

  }

  const ScreenElem: React.FC<ScreenElem> = ({label}) =>  {

    return (
    
    <div className="total-screen">
        <div className="small-screen">{label}</div>
    
        </div>
    )
}


export default ScreenElem;