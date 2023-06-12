import React, { useState } from 'react';
import './Component.css';
import Message from './Message';

interface GroupProps {
  listelem: GroupReturn[];
  onSelection: (selectedElements: GroupReturn[]) => void;
}

export interface GroupReturn {
  group_id: number;
  housekeeper_id: number;
  groupRooms: {
    group_id: number;
    room_id: string;
  }[];
  GroupChamber: {
    group_id: number;
    chambermaid_id: number;
    chambermaid: {
      name: string;
    }
  }[];
}

const GroupList: React.FC<GroupProps> = ({ listelem, onSelection }) => {
  const [selectedElems, setSelectedElems] = useState<GroupReturn[]>([]);

  const handleElemClick = (listelem: GroupReturn) => {
    if (selectedElems.some((elem) => elem.group_id === listelem.group_id)) {
      const updatedSelection = selectedElems.filter((elem) => elem.group_id !== listelem.group_id);
      setSelectedElems(updatedSelection);
    } else {
      const updatedSelection = [...selectedElems, listelem];
      setSelectedElems(updatedSelection);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, listelem: GroupReturn) => {
    if (e.target.checked) {
      const updatedSelection = [...selectedElems, listelem];
      setSelectedElems(updatedSelection);
    } else {
      const updatedSelection = selectedElems.filter((elem) => elem.group_id !== listelem.group_id);
      setSelectedElems(updatedSelection);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredElems = listelem.filter((listelem) => {
    const groupMatch = listelem.group_id.toString().includes(searchQuery);
    return groupMatch;
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
              name={listelem.group_id.toString()}
              selected={selectedElems.some((elem) => elem.group_id === listelem.group_id)}
              onClick={() => handleElemClick(listelem)}
            />
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedElems.some((elem) => elem.group_id === listelem.group_id)}
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

export default GroupList;
