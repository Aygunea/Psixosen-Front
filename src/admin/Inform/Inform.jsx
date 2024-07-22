import React, { useState } from 'react';
import Complaint from './Complaint';
import Suggest from './Suggest';
import CreateNotification from './CreateNotification';

const Inform = () => {
  const [activeButton, setActiveButton] = useState('Şikayət');

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='p-8'>
      <div className='flex gap-4 pb-8'>
        {['Şikayət', 'Təklif', 'Bildiriş göndər'].map(buttonName => (
          <button
            key={buttonName}
            onClick={() => handleClick(buttonName)}
            className={`w-[160px] text-base font-medium p-3 rounded-[5px] text-light70  transition-opacity duration-300
              ${activeButton === buttonName ? 'bg-lightgray  text-gray10 opacity-100' : 'bg-transparent border border-light20 text-light70'}`}
          >
            {buttonName}
          </button>
        ))}
      </div>
      {activeButton === 'Şikayət' && <Complaint />}
      {activeButton === 'Təklif' && <Suggest />}
      {activeButton === 'Bildiriş göndər' && <CreateNotification />}
    </div>
  );
};

export default Inform;
