"use client"
import React ,{ useState }  from 'react'
import './Component.css';
import Message from './Message';

export interface MessageData {
    num: string;
    text: string;
    name: string;
  }
  
  interface MessageListProps {
    messages: MessageData[];
    onDeleteMessage: (message: MessageData) => void;
  }
  
  const MessageList: React.FC<MessageListProps> = ({ messages, onDeleteMessage }) => {
    const [selectedMessage, setSelectedMessage] = useState<MessageData | null>(null);

    const handleCloseMessage = () => {
        setSelectedMessage(null);
      };

    const handleMessageClick = (message: MessageData) => {
        setSelectedMessage(message);
      };

      const handleDeleteMessage = () => {
        if (selectedMessage) {
          onDeleteMessage(selectedMessage);
          setSelectedMessage(null);
        }
      };

    const [searchQuery, setSearchQuery] = useState('');
    const filteredMessages = messages.filter(
    (message) => message.num.includes(searchQuery)
    );
    return (
        <>
        <input className="roomSearch"
            type="text"
            placeholder="Search by room number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
/>
      <div className="msg-list">
      {filteredMessages.map((message, index) => (
          <Message
            key={index}
            num={message.num}
            text={message.text}
            name={message.name}
            selected={selectedMessage === message}
            onClick={() => handleMessageClick(message)}
          />
        ))}
      </div>
      {selectedMessage && (
        <div className="selected-message">
            <Message num={selectedMessage.num} text={selectedMessage.text} name={selectedMessage.name} onClick={() => handleMessageClick(selectedMessage)} selected={true}/>
            <div className='button-container'>
        <button className="blueButton" type="submit" onClick={handleCloseMessage} >

          Close

        </button>
        <button className="blueButton" onClick={handleDeleteMessage}>
              Delete
            </button>
        </div>
        </div> 
        )}
      </>
    );
  };
  
  export default MessageList;

