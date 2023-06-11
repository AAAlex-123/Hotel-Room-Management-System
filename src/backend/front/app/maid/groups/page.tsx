"use client"
import Layout from '@/app/components/Layout';
import SmallScreen from '@/app/components/SmallScreen';
import React, { useState } from 'react';
import GroupList, { GroupReturn } from '@/app/components/GroupList';
import Link from 'next/link';
import Head from 'next/head';
import { notFound, useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';




async function DeleteGroup() {
  const label = 'Delete Group';
  // const { push, refresh } = useRouter()
  // if (typeof window===undefined)notFound()
  const employee_id ="-1"
  //  localStorage.getItem("employee_id")
  // const token = localStorage.getItem("token")
  // const url = process.env.NEXT_PUBLIC_URL;
  // const get_res = await fetch(`${url}/employee/${employee_id}`, { cache: "no-cache", headers: { authorization: `Bearer ${token}` } })
  // if (!get_res.ok) {
  //   push("/")
  // }
  const employee={name:""} 
  // await get_res.json()
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
      <Head>
        <title>Create Group</title>
      </Head>
      <div><Layout id={Number(employee_id??-1)} username={employee.name} /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <GroupList listelem={listelem} onSelection={handleSelectionChange} />

            <Link href='/maid-management'>
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