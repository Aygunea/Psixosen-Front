import React, { useState } from 'react';
import Head from './Head';
import Contact from './Contact';
import ChatHeader from './ChatHeader';
import Chat from './Chat';


const Conversations = () => {
  const [activeTab, setActiveTab] = useState('Söhbətlər');

  return (
    <div className='h-full grid grid-rows-[auto_1fr]'>
      <div className="grid grid-cols-[350px_1fr] xs:auto-cols-auto py-[18px]">
        <Head activeTab={activeTab} setActiveTab={setActiveTab} />
        <ChatHeader />
      </div>
      <div className='xs:auto-cols-auto sm:grid sm:grid-cols-[350px_1fr] sm:overflow-hidden'>
        <Contact activeTab={activeTab} />
        <Chat />
      </div>
    </div>
  );
};

export default Conversations;