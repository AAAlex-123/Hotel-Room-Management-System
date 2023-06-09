"use client"
import Layout from '../Components/Layout';
import SmallScreen from '../Components/SmallScreen';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GroupList, { GroupReturn } from '../Components/GroupList';




const DeleteGroup: React.FC = () => {
  const label = 'Delete Group';
  const [listelem, setElem] = useState<GroupReturn[]>([
    {
      group_id: 1,
      housekeeper_id: 100,
      groupRooms: [
        { group_id: 1, room_id: '101' },
        { group_id: 1, room_id: '102' },
      ],
      GroupChamber: [
        { group_id: 1, chambermaid_id: 200 },
        { group_id: 1, chambermaid_id: 201 },
      ],
    },
    {
      group_id: 2,
      housekeeper_id: 101,
      groupRooms: [
        { group_id: 2, room_id: '103' },
        { group_id: 2, room_id: '104' },
      ],
      GroupChamber: [
        { group_id: 2, chambermaid_id: 202 },
        { group_id: 2, chambermaid_id: 203 },
        { group_id: 2, chambermaid_id: 204 },
      ],
    },
  ]);

  const [selectedElements, setSelectedElements] = useState<GroupReturn[]>([]);

  const handleSelectionChange = (selectedElems: GroupReturn[]) => {
    setSelectedElements(selectedElems);
  };

  const deleteGroup = () => {
    const updatedList = listelem.filter((elem) => !selectedElements.includes(elem));
    setElem(updatedList);
    setSelectedElements([]);
  };

    return (
      <>
              {/* <Head>
          <title>Create Group</title>
      </Head> */}
      <div><Layout 
      // title={'Create Group'}
      /> </div>
      <div> <SmallScreen label={label}/>
      <div className="res-container">
      <div className="whiteBox">
          <GroupList listelem={listelem} onSelection={handleSelectionChange}/>
             
            <Link to='/maid-management'>
            <button className="blueButton" type="submit">
    
              Close
    
            </button>
            
          </Link>


          <button className="blueButton" onClick={deleteGroup} type="submit">
                  Delete
                </button>

        </div>
        </div>
        </div>
    </>
      
    );
  
    };
export default DeleteGroup;