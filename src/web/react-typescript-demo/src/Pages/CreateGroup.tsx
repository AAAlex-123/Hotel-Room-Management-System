"use client"
import Layout from '../Components/Layout';
import SmallScreen from '../Components/SmallScreen';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SelectionList, { ListData } from '../Components/SelectionList';

export interface GroupData {
  id: string;
  name: string;
  members: ListData[];
}

const CreateGroup: React.FC = () => {
  const label = 'Create Group';
  const [listelem, setElem] = useState<ListData[]>([
    { num: '139303', name: 'Electra' },
    { num: '140303', name: 'Anastasis' },
    { num: '141303', name: 'Alex' },
    { num: '142303', name: 'Giannis' },
    { num: '143303', name: 'Panos' },
    { num: '144303', name: 'Gkionis' },
    { num: '145303', name: 'Dimitris' },
  ]);

  const [selectedElements, setSelectedElements] = useState<ListData[]>([]);
  const [groupName, setGroupName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleSelectionChange = (selectedElems: ListData[]) => {
    setSelectedElements(selectedElems);
    
  };

  const createGroup = () => {
    
    if (selectedElements.length === 0) {
      setShowWarning(true);
      
      setTimeout(() => {
        setShowWarning(false);
      }, 1000);
      return;
    }
    setShowWarning(false);
    const group: GroupData = {
      id: 'groupId', 
      name: groupName,
      members: selectedElements,
    };

    
    const updatedList = listelem.filter((elem) => !selectedElements.includes(elem));
    setElem(updatedList);

  };

  const handleCreateGroupClick = () => {
    setShowInput(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createGroup();
    setShowInput(false);
  };

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
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
          <SelectionList listelem={listelem} onSelection={handleSelectionChange}/>
             
            <Link to='/maid-management'>
            <Button className="blueButton" type="submit">
    
              Close
    
            </Button>
            
          </Link>
          
            {showInput ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={groupName}
                  onChange={handleGroupNameChange}
                  placeholder="Enter Group Name"
                />
                <Button className="blueButton" type="submit">
                  Create Group
                </Button>
              </form>
            ) : (
              <div>
                <Button className="blueButton" type="submit" onClick={handleCreateGroupClick}>
                  Create Group
                </Button>
              </div>
            )}
            {showWarning && <div className="warning">Please select at least one member for the group.</div>}
        </div>
        </div>
        </div>
    </>
      
    )
  
    }
export default CreateGroup;