"use client"
import Layout from '../../components/Layout';
import SmallScreen from '../../components/SmallScreen';
import React, { useState } from 'react';
import SelectionList, { ListData } from '../../components/SelectionList';
import { GroupData } from '../groups/page';
import GroupList from '../../components/GroupList';
import { useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';
import Head from 'next/head';
import Link from 'next/link';

export interface CleanData {
  id: string;
  name: string;
  maids: GroupData[];
  housekeeper: ListData[];
  rooms: ListData[];
}

const AssignRooms: React.FC = async () => {
  const label = 'Assign Rooms';
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const url=process.env.NEXT_PUBLIC_URL;
  const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authrization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }

  const [groupName, setGroupName] = useState('');
  const employee: EmployeeEntityNoPass = await get_res.json()
  const [roomElem, setElem] = useState<ListData[]>([
    { num: '101' },
    { num: '102' },
    { num: '103' },
    { num: '104' },
    { num: '105' },
    { num: '106' },
    { num: '107' },
  ]);

  const [maidElem, setElem2] = useState<GroupData[]>([
    {
      id: '1',
      name: 'Group 1',
      members: [
        { num: '139303', name: 'Electra' },
        { num: '140303', name: 'Anastasis' },
      ],
    },
    {
      id: '2',
      name: 'Group 2',
      members: [
        { num: '141303', name: 'Alex' },
        { num: '142303', name: 'Giannis' },
      ],
    },
  ]);

  const [hskElem, setElem3] = useState<ListData[]>([
    { num: '143303', name: 'Panos' },
    { num: '144303', name: 'Gkionis' },
    { num: '145303', name: 'Dimitris' },

  ])


  const [selectedElements, setSelectedElements] = useState<ListData[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupData[]>([]);
  const [selectedHsk, setSelectedHsk] = useState<ListData[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleSelectionChange = (selectedElems: ListData[]) => {
    setSelectedElements(selectedElems);
  };

  const handleGroupChange = (selectedGroup: GroupData[]) => {
    setSelectedGroup(selectedGroup);
  }

  const handleHskChange = (selectedHsk: ListData[]) => {
    setSelectedHsk(selectedHsk);
  };

  const createGroup = () => {

    if (selectedElements.length === 0 || selectedGroup.length !== 1 || selectedHsk.length !== 1) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 1000);
      return;
    }
    setShowWarning(false);
    const group: CleanData = {
      id: 'groupId',
      name: groupName,
      maids: selectedGroup,
      housekeeper: selectedHsk,
      rooms: selectedElements,


    };


    const updatedList1 = roomElem.filter((elem) => !selectedElements.includes(elem));
    setElem(updatedList1);

    const updatedList2 = maidElem.filter((elem) => !selectedGroup.includes(elem));
    setElem2(updatedList2);

    const updatedList3 = hskElem.filter((elem) => !selectedHsk.includes(elem));
    setElem3(updatedList3);

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
      <Head>
        <title>Create Group</title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee.name ?? ""} /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <div className="manyLists">
              <div className="listColumn">
                <SelectionList listelem={roomElem} onSelection={handleSelectionChange} />
              </div>
              <div className="listColumn">
                <GroupList listelem={maidElem} onSelection={handleGroupChange} />
              </div>
              <div className="listColumn">
                <SelectionList listelem={hskElem} onSelection={handleHskChange} />
              </div>


              <Link href='/maid-management'>
                <button className="blueButton" type="submit">
                  Close
                </button>
              </Link>

              {showInput ? (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={groupName}
                    onChange={handleGroupNameChange}
                    placeholder="Enter Group Name"
                  />
                  <button className="blueButton" type="submit">
                    Create Group
                  </button>
                </form>
              ) : (
                <div>
                  <button className="blueButton" type="submit" onClick={handleCreateGroupClick}>
                    Create Group
                  </button>
                </div>
              )}
              {showWarning && <div className="warning">Please select at least one member for the group.</div>}
            </div>
          </div>
        </div>
      </div>
    </>

  )

}
export default AssignRooms;