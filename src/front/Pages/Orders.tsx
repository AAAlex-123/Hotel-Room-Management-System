"use client"
import React, { useState } from 'react'
import Layout from '../Components/Layout'
import SmallScreen from '../Components/SmallScreen'
import Link  from 'next/link';
import Button from "react-bootstrap/Button";
import MessageList, {MessageData} from '../Components/MessageList';

const Orders: React.FC = () => {
    const label= 'Orders';
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
      //Sex with Dottore 

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
        <div> <SmallScreen label={label}/>
        <div className="res-container">
      <div className="whiteBox">
        <MessageList messages={messages} onDeleteMessage={handleDeleteMessage}/>

      <Link href='/maid-management'>
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
  
  export default Orders;