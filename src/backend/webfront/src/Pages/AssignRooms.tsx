"use client"
import Layout from '../Components/Layout';
import SmallScreen from '../Components/SmallScreen';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SelectionList, { ListData } from '../Components/SelectionList';
import { GroupReturn } from '../Components/GroupList';
import { EmployeeEntityNoPass } from '../Components/Employee';
import { Room } from '../Components/Room';
import { Helmet } from 'react-helmet';


export interface CleanData {
  id?: string;
  name: string;
  maids: ListData[];
  housekeeper: ListData[];
  rooms: ListData[];
}

const AssignRooms: React.FC = () => {
  const url = window.location.origin+"/api"
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const label = 'Assign Rooms';
  const [groupName, setGroupName] = useState('');
  const [roomElem, setElem] = useState<ListData[]>([]);
  const push = useNavigate()
  const [maidElem, setElem2] = useState<ListData[]>([])
  const [hskElem, setElem3] = useState<ListData[]>([])
  useEffect(() => {
    async function hey() {
      const sp = await fetch(`${url}/group`, { headers: { authorization: `Bearer ${token}` } })
      if (sp.ok) {
        const response = await fetch(`${url}/room`, { headers: { authorization: `Bearer ${token}` } })
        if (response.ok) {
          const r = await fetch(`${url}/group/employee`, { headers: { authorization: `Bearer ${token}` } })
          if (r.ok) {
            const rooms: Room[] = await response.json()
            const employees: EmployeeEntityNoPass[] = await r.json()
            setElem([...rooms.map(value => ({ num: value.room_id }))])
            setElem2([...employees.filter(value => value.type === "CHAMBERMAID").map(value => ({ num: String(value.employee_id), name: value.name }))])
            setElem3([...employees.filter(value => value.type === "HOUSEKEEPER").map(value => ({ num: String(value.employee_id), name: value.name }))])
          }
        }
      }
    }
    hey().catch(console.error)
  })


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

  const createGroup = async () => {

    if (selectedElements.length === 0 || selectedGroup.length === 0 || selectedHsk.length !== 1) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
      return;
    }
    setShowWarning(false);
    const group: CleanData = {
      name: groupName,
      maids: selectedGroup,
      housekeeper: selectedHsk,
      rooms: selectedElements,
    };
    const rest = {
      housekeeper_id: Number(group.housekeeper[0].num),
      chambermaid: group.maids.flatMap(value => Number(value.num)),
      room_numbers: group.rooms.flatMap(value => value.num),
    }
    console.log(rest);

    const response = await fetch(`${url}/group`, { method: "POST", headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(rest) })
    if (response.ok) {

      const updatedList1 = roomElem.filter((elem) => !selectedElements.includes(elem));
      setElem(updatedList1);

      const updatedList2 = maidElem.filter((elem) => !selectedGroup.includes(elem));
      setElem2(updatedList2);

      const updatedList3 = hskElem.filter((elem) => !selectedHsk.includes(elem));
      setElem3(updatedList3);
      push("/maid/assign")
    }
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
      <Helmet>
        <title>Create Group</title>
      </Helmet>
      <div><Layout
      /> </div>
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
              <Link to='/maid'>
                <button className="blueButton" type="submit">
                  Close
                </button>
              </Link>
              {showInput ? (
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
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
              {showWarning && <div className="warning">Please select at least one member, only one housekeeper and rooms for the group.</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AssignRooms;