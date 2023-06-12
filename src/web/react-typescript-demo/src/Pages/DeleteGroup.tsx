"use client"
import Layout from '../Components/Layout';
import SmallScreen from '../Components/SmallScreen';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GroupList, { GroupReturn } from '../Components/GroupList';
import { Helmet } from 'react-helmet';




const DeleteGroup: React.FC = () => {
  const url = process.env.REACT_APP_URL
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const label = 'Delete Group';
  const [listelem, setElem] = useState<GroupReturn[]>([]);
  useEffect(() => {
    async function hey() {
      const response = await fetch(`${url}/group`, { headers: { authorization: `Bearer ${token}` } })
      if (response.ok) {
        const group: GroupReturn[] = await response.json()
        setElem(group)
      }
    }
    hey().catch(console.error)
  })

  const [selectedElements, setSelectedElements] = useState<GroupReturn[]>([]);

  const handleSelectionChange = (selectedElems: GroupReturn[]) => {
    setSelectedElements(selectedElems);
  };

  const deleteGroup = async () => {
    const response = await fetch(`${url}/group/${selectedElements[0].group_id}`, { method: "DELETE", headers: { authorization: `Bearer ${token}` } })
    if (response.ok) {
      const updatedList = listelem.filter((elem) => !selectedElements.includes(elem));
      setElem(updatedList);
      setSelectedElements([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Group</title>
      </Helmet>
      <div><Layout /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <GroupList listelem={listelem} onSelection={handleSelectionChange} />
            <Link to='/maid'>
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