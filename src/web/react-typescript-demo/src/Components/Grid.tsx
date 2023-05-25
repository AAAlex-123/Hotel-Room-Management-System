import React from 'react'
import './Component.css';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

interface GridElem {
    labels: string[];
    elem: number;
    clicked: (label: string) => void;
  }

  const Grid: React.FC<GridElem> = ({ labels, elem, clicked }) =>  {
    const renderGridItems = () => {
        const items = [];
        for (let i = 0; i < elem; i++) {
          const label = labels[i] || ''; 
          items.push(<button key={i} onClick={() => clicked(label)}>
          {label}</button>);
        }
        return items;
      };
    
      return ( 
      <div className="grid-button-container">
        <div className="grid-container">{renderGridItems()} </div>
        <Link to='/main'>
        <Button className="blueButton" type="submit" >

          Close

        </Button>
      </Link> 
    

      </div>
      )
}


export default Grid;