import './Component.css';
import Button from "react-bootstrap/Button";


interface DetElem {
    titles: string[];
    content: string[];
    elem: number;
    text: string;
    text2?: string | null;
    onClose: () => void;
  }
  
  const Details: React.FC<DetElem> = ({ titles, content, elem, text, text2='', onClose}) =>  {


  

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
        <Button className="blueButton" type="submit" onClick={onClose} >

          {text}

        </Button>
        {text2 !== null && ( 

          <Button className="blueButton" type="submit">

            {text2}
            
          </Button>
        )}

        </div>  

      </div>
      )
}


export default Details;

