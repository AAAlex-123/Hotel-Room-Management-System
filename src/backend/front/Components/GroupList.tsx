"use client"
import React ,{ useState }  from 'react'
import './Component.css';
import Message from './Message';
import {GroupData}from '../Pages/CreateGroup';

  
  interface GroupProps {
    listelem: GroupData[] 
    onSelection: (selectedElements: GroupData[]) => void;

  }
  
const SelectionList: React.FC<GroupProps> = ({ listelem, onSelection }) => {
    const [selectedElems, setSelectedElems] = useState<GroupData[]>([]);

    const handleElemClick = (listelem: GroupData) => {
      if (selectedElems.some((elem) => elem.name === listelem.name)) {

        const updatedSelection = selectedElems.filter((elem) => elem.name !== listelem.name);
        setSelectedElems(updatedSelection);
      } else {

        const updatedSelection = [...selectedElems, listelem];
        setSelectedElems(updatedSelection);
      }
    };
  
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, listelem: GroupData) => {
      if (e.target.checked) {
  
        const updatedSelection = [...selectedElems, listelem];
        setSelectedElems(updatedSelection);
      } else {

        const updatedSelection = selectedElems.filter((elem) => elem.name !== listelem.name);
        setSelectedElems(updatedSelection);
      }
    };
  
    const [searchQuery, setSearchQuery] = useState('');
    const filteredElems = listelem.filter((listelem) => {
      const nameMatch =  listelem.name.includes(searchQuery);
      return  nameMatch;
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
            num={null}
            text={null}
            name={listelem.name}
            selected={selectedElems.some((elem) => elem.name === listelem.name)}
            onClick={() => handleElemClick(listelem)}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={selectedElems.some((elem) => elem.name === listelem.name)}
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
