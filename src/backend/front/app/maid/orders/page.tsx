"use client"
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import SmallScreen from '../../components/SmallScreen'
import MessageList, { MessageData } from '../../components/MessageList';
import { useRouter } from 'next/navigation';
import { EmployeeEntityNoPass } from '@/app/Employee';
import Link from 'next/link';

const Orders: React.FC = async () => {
  const label = 'Orders';
  const { push, refresh } = useRouter()
  const employee_id = localStorage.getItem("employee_id")
  const token = localStorage.getItem("token")
  const get_res = await fetch(`http://localhost:8081/api/employee/${employee_id}`, { cache: "no-cache", headers: { authrization: `Bearer ${token}` } })
  if (!get_res.ok) {
    push("/")
  }
  const employee: EmployeeEntityNoPass = await get_res.json()
  const [messages, setMessages] = useState<MessageData[]>([
    { num: '166', text: 'I want to put Dottore in a blender', name: "Electra" },
    { num: '123', text: 'Hello, world!', name: "Who" },
    { num: '124', text: 'Hell, world!', name: "Who" },
    { num: '125', text: 'Help, world!', name: "Who" },
    { num: '126', text: 'Hello, word!', name: "Who" },
    { num: '127', text: 'He would!', name: "Who" },
    { num: '128', text: 'Hell, word!', name: "Who" },
    { num: '129', text: 'Hello, world.', name: "Who" },

  ]);


  const handleDeleteMessage = (message: MessageData) => {
    setMessages((prevMessages) => prevMessages.filter((m) => m !== message));
  };
  return (
    <>
      {/* <Head>
          <title>Orders</title>
      </Head> */}
      <div><Layout
      // title={'Orders'}
      /> </div>
      <div> <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <MessageList messages={messages} onDeleteMessage={handleDeleteMessage} />

            <Link href='/maid-management'>
              <button className="blueButton" type="submit">

                Close

              </button>
            </Link>

          </div>

        </div>



      </div>
    </>

  )
}

export default Orders;