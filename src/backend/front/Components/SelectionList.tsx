"use client"
import React ,{ useState }  from 'react'
import './Component.css';
import Message from './Message';


export interface ListData {
    num: string;
    name?: string | null;
  }
  
  interface ListProps {
    listelem: ListData[] 
    onSelection: (selectedElements: ListData[]) => void;

  }
  
const SelectionList: React.FC<ListProps> = ({ listelem, onSelection }) => {
    const [selectedElems, setSelectedElems] = useState<ListData[]>([]);

    const handleElemClick = (listelem: ListData) => {
      if (selectedElems.some((elem) => elem.num === listelem.num)) {

        const updatedSelection = selectedElems.filter((elem) => elem.num !== listelem.num);
        setSelectedElems(updatedSelection);
      } else {

        const updatedSelection = [...selectedElems, listelem];
        setSelectedElems(updatedSelection);
      }
    };
  
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, listelem: ListData) => {
      if (e.target.checked) {
  
        const updatedSelection = [...selectedElems, listelem];
        setSelectedElems(updatedSelection);
      } else {

        const updatedSelection = selectedElems.filter((elem) => elem.num !== listelem.num);
        setSelectedElems(updatedSelection);
      }
    };
  
    const [searchQuery, setSearchQuery] = useState('');
    const filteredElems = listelem.filter((listelem) => {
      const numMatch = listelem.num.includes(searchQuery);
      const nameMatch = listelem.name ? listelem.name.includes(searchQuery) : false;
      return numMatch || nameMatch;
    });
  

    React.useEffect(() => {
      onSelection(selectedElems);
    }, [selectedElems, onSelection]);
  return (
    <>
    <input
      className="roomSearch"
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <div className="msg-list">
      {filteredElems.map((listelem, index) => (
        <div key={index} className="message" onClick={() => handleElemClick(listelem)}>
          <Message
            num={listelem.num}
            text={null}
            name={listelem.name}
            selected={selectedElems.some((elem) => elem.num === listelem.num)}
            onClick={() => handleElemClick(listelem)}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={selectedElems.some((elem) => elem.num === listelem.num)}
              onChange={(e) => handleCheckboxChange(e, listelem)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      ))}
    </div>
  </>
  );
};
  export default SelectionList;

