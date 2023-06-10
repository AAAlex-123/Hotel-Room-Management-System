"use client"
import './Component.css';

interface DetElem {
    titles: string[];
    content: string[];
    elem: number;
    text: string;
    text2?: string | null;
    onClose: () => void;
    onButtonClick?: () => void;
  }
  
  const Details: React.FC<DetElem> = ({ titles, content, elem, text, text2='', onClose , onButtonClick}) =>  {


  

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
      <div className='button-container'>
        <button className="blueButton" type="submit" onClick={onClose} >

          {text}

        </button>
        {text2 !== null && ( 

          <button className="blueButton" type="submit" onClick={onButtonClick}>

            {text2}
            
          </button>
        )}

        </div>  

      </div>
      )
}


export default Details;

