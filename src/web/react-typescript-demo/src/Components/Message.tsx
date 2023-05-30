import React from 'react';


interface MessageProps {
  num: string;
  text: string;
  name: string;
  selected: boolean;
  onClick: () => void;


}

const Message: React.FC<MessageProps> = ({ num, text, name, selected,  onClick,}) => {

  return (
       <div className={`message ${selected ? 'selected' : ''}`} onClick={onClick}>
        <div className="num-circle">
      <p>{num}</p>
      </div>
      <div className="message-content">
      <p>{name}</p>
      <p>{text}</p>
      </div>

        </div>

  );
};

export default Message;