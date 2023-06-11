import React, { useState } from 'react';
import './Component.css';
import NoteOrder, { NoteEntity, ProvisionEntity } from './NoteOrders';

export interface MessageData {
  note?: NoteEntity;
  provision?: ProvisionEntity;
}

interface NoteOrderListProps {
  messages: MessageData[];
  onDeleteMessage: (message: MessageData) => void;
}

const NoteOrderList: React.FC<NoteOrderListProps> = ({ messages, onDeleteMessage }) => {
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
  const filteredMessages = messages.filter((message) => {
    const { note, provision } = message;
    if (note) {
      return note.room_id.toString().includes(searchQuery);
    }
    if (provision) {
      return provision.employee_id.toString().includes(searchQuery);
    }
    return false;
  });

  return (
    <>
      <input
        className="roomSearch"
        type="text"
        placeholder={selectedMessage?.note ? 'Search by room number' : 'Search by employee ID'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="msg-list">
        {filteredMessages.map((message, index) => {
          if (message.note) {
            return (
              <NoteOrder
                key={index}
                message={message.note}
                selected={selectedMessage === message}
                onClick={() => handleMessageClick(message)}
              />
            );
          }
          if (message.provision) {
            return (
              <NoteOrder
                key={index}
                message={message.provision}
                selected={selectedMessage === message}
                onClick={() => handleMessageClick(message)}
              />
            );
          }
          return null;
        })}
      </div>
      {selectedMessage && (
        <div className="selected-message">
          {selectedMessage.note && (
            <NoteOrder
              message={selectedMessage.note}
              onClick={() => handleMessageClick(selectedMessage)}
              selected={true}
            />
          )}
          {selectedMessage.provision && (
            <NoteOrder
              message={selectedMessage.provision}
              onClick={() => handleMessageClick(selectedMessage)}
              selected={true}
            />
          )}
          <div className="button-container">
            <button className="blueButton" type="submit" onClick={handleCloseMessage}>
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

export default NoteOrderList;
