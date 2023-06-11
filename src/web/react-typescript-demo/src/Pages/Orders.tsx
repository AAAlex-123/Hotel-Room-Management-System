import React, { useState } from 'react';
import Layout from '../Components/Layout';
import SmallScreen from '../Components/SmallScreen';
import { Link } from 'react-router-dom';
import NoteOrderList, { MessageData } from '../Components/NoteOrderList';

const Orders: React.FC = () => {
  const label = 'Orders';

  const [messages, setMessages] = useState<MessageData[]>([
    { provision: { provision_id: 1, description: 'First provision', employee_id: 55, complete: false, creation: new Date('2023-05-30') } },
    { provision: { provision_id: 2, description: 'Second provision', employee_id: 47, complete: true, creation: new Date('2023-05-31') } },
    { provision: { provision_id: 3, description: 'Third provision', employee_id: 43, complete: false, creation: new Date('2023-06-01') } },
  ]);

  const handleDeleteMessage = (message: MessageData) => {
    if (message.provision) {
      setMessages(prevMessages => prevMessages.filter(m => m !== message));
    }
  };

  return (
    <>
         {/* <Head>
          <title>Orders</title>
      </Head> */}
        <div><Layout 
        // title={'Orders'}
        /> </div>
      <div>
        <SmallScreen label={label} />
        <div className="res-container">
          <div className="whiteBox">
            <NoteOrderList messages={messages} onDeleteMessage={handleDeleteMessage} />
            <Link to="/maid-management">
              <button className="blueButton" type="submit">
                Close
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
