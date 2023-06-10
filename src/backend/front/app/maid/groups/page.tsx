"use client"
import Layout from '../../components/Layout';
import SmallScreen from '../../components/SmallScreen';
import React, { useState } from 'react';
import SelectionList, { ListData } from '../../components/SelectionList';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';

export interface GroupData {
  id: string;
  name: string;
  members: ListData[];
}

const CreateGroup: React.FC = async () => {
  const label = 'Create Group';
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const url=process.env.NEXT_PUBLIC_URL;
  const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authrization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
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
      <Head>
        <title>Create Group</title>
      </Head>
      <div><Layout id={Number(employee_id ?? "-1")} username={employee.name ?? ""} /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <SelectionList listelem={listelem} onSelection={handleSelectionChange} />

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
    </>

  )

}
export default CreateGroup;