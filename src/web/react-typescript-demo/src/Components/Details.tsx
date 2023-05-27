import './Component.css';
import Button from "react-bootstrap/Button";
import React, { useState} from 'react';

interface DetElem {
    titles: string[];
    content: string[];
    elem: number;
    text: string;
  }
  
  const Details: React.FC<DetElem> = ({ titles, content, elem, text}) =>  {
    const [showPopup, setShowPopup] = useState(false);
    const closePopup = () => {
      setShowPopup(false);
    };
    if (!showPopup) {
      return null; 
    }
    const renderGridItems = () => {
        const items = [];
        for (let i = 0; i < elem; i++) {
          const title = titles[i] || '';
          const con = content[i] || ''; 
          items.push(
          <div className="det-container">
            <span key={i}> {title} </span> 
            <span> {con} </span>
          </div>
          );
        }
        return items;
      };
    
      return ( 
      <div className="det-button-container">
        {renderGridItems()} 
        <Button className="blueButton" type="submit" onClick={closePopup} >

          {text}

        </Button>


      </div>
      )
}


export default Details;

