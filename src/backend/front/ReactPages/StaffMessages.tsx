"use client"
import React, { useState } from 'react'
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import MessageList, {MessageData} from '../Components/MessageList';
import Link from 'next/link';

const StaffMessages: React.FC = () => {
    const label= 'Staff Messages';
    const [messages, setMessages] = useState<MessageData[]>([
        { num: '166', text: 'I want to put Dottore in a blender' , name:"Electra"},
        { num: '123', text: 'Hello, world!' , name: "Who"},
        { num: '124', text: 'Hell, world!' , name: "Who"},
        { num: '125', text: 'Help, world!' , name: "Who"},
        { num: '126', text: 'Hello, word!' , name: "Who"},
        { num: '127', text: 'He would!' , name: "Who"},
        { num: '128', text: 'Hell, word!' , name: "Who"},
        { num: '129', text: 'Hello, world.' , name: "Who"},
  
      ]);
        // TO-DO: You see the messages? Ok cool then find them instead of this temporary content jk there's no stuff messages...

      const handleDeleteMessage = (message: MessageData) => {
        setMessages((prevMessages) => prevMessages.filter((m) => m !== message));
      };
      return (
        <>
                {/* <Head>
          <title>Staff Messages</title>
      </Head> */}
        <div><Layout 
        // title={'Staff Messages'}
        /> </div>
        <div> <SmallScreen label={label}/>
        <div className="res-container">
      <div className="whiteBox">
        <MessageList messages={messages} onDeleteMessage={handleDeleteMessage}/>

      <Link href='/misc'>
            <button className="bluebutton" type="submit">
    
              Close
    
            </button>
          </Link>

          </div>

          </div>



         </div>
        </>
        
      )
    }
  
  export default StaffMessages;