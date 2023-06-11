"use client"
import Layout from '@/app/components/Layout';
import SmallScreen from '@/app/components/SmallScreen';
import React, { useState } from 'react';
import SelectionList, { ListData } from '@/app/components/SelectionList';
import Head from 'next/head';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';

export interface CleanData {
  id: string;
  name: string;
  maids: ListData[];
  housekeeper: ListData[];
  rooms: ListData[];
}

async function AssignRooms() {
  const label = 'Assign Rooms';
  // const { push } = useRouter()
  // if (typeof window===undefined)notFound()
  const employee_id ="-1" 
  // localStorage.getItem("employee_id")
  const employee ={name:""}
  //  localStorage.getItem("token")
  // const url = process.env.NEXT_PUBLIC_URL;
  // const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  // if (!get_res.ok) {
  //   push("/")
  // }
  // const employee: EmployeeEntityNoPass = await get_res.json()
  const [groupName, setGroupName] = useState('');
  const [roomElem, setElem] = useState<ListData[]>([
    { num: '101' },
    { num: '102' },
    { num: '103' },
    { num: '104' },
    { num: '105' },
    { num: '106' },
    { num: '107' },
  ]);

  const [maidElem, setElem2] = useState<ListData[]>([
    { num: '139303', name: 'Electra' },
    { num: '140303', name: 'Anastasis' },
    { num: '141303', name: 'Alex' },
    { num: '142303', name: 'Giannis' },
    { num: '143303', name: 'Panos' },
    { num: '144303', name: 'Gkionis' },
    { num: '145303', name: 'Dimitris' },
  ]);


  const [hskElem, setElem3] = useState<ListData[]>([
    { num: '143303', name: 'Panos' },
    { num: '144303', name: 'Gkionis' },
    { num: '145303', name: 'Dimitris' },

  ])


  const [selectedElements, setSelectedElements] = useState<ListData[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<ListData[]>([]);
  const [selectedHsk, setSelectedHsk] = useState<ListData[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleSelectionChange = (selectedElems: ListData[]) => {
    setSelectedElements(selectedElems);
  };

  const handleGroupChange = (selectedGroup: ListData[]) => {
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
      <div><Layout id={Number(employee_id??"-1")} username={employee.name}/> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <div className="manyLists">
              <div className="listColumn">
                <SelectionList listelem={roomElem} onSelection={handleSelectionChange} grid={false} />
              </div>
              <div className="listColumn">
                <SelectionList listelem={maidElem} onSelection={handleGroupChange} grid={false} />
              </div>
              <div className="listColumn">
                <SelectionList listelem={hskElem} onSelection={handleHskChange} grid={false} />
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