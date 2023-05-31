"use client"
import React, { useState } from 'react'
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import MessageList, {MessageData} from '../Components/MessageList';

const GuestMessages: React.FC = () => {
    const label= 'Guest Messages';
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
                 // TO-DO: You see the messages? Ok cool then find them instead of this temporary content

      const handleDeleteMessage = (message: MessageData) => {
        setMessages((prevMessages) => prevMessages.filter((m) => m !== message));
      };
      return (
        <>
                {/* <Head>
          <title>Guest Messages</title>
      </Head> */}
        <div><Layout 
        // title={'Guest Messages'}
        /> </div>
        <div> <SmallScreen label={label}/>
        <div className="res-container">
      <div className="whiteBox">
        <MessageList messages={messages} onDeleteMessage={handleDeleteMessage}/>

      <Link to='/misc'>
            <Button className="blueButton" type="submit">
    
              Close
    
            </Button>
          </Link>

          </div>

          </div>



         </div>
        </>
        
      )
    }
  
  export default GuestMessages;