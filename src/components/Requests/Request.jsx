import React, { useState } from 'react';
import RequestPool from './RequestPool';
import RequestSpecific from './RequestSpecific';
import { useSelector } from 'react-redux';
import RequestUser from './RequestUser';

const Request = () => {
  const role = useSelector(state => state.role.role)
  const [activeButton, setActiveButton] = useState('requestPool');

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      {role === 'listener' ?
        <>
          <div className='flex gap-4 pb-8'>
            <button
              onClick={() => handleClick('requestPool')}
              className={`lg:text-lg text-sm xxs:text-xs font-medium lg:font-semibold p-3 rounded-[5px] text-light70 dark:text-dark70 
              ${activeButton === 'requestPool' ? 'dark:bg-gray10 bg-lightgray dark:text-dark100 text-gray10 opacity-100' : 'bg-transparent opacity-70'}`}
            >
              Müraciət hovuzu
            </button>
            <button
              onClick={() => handleClick('requestSpecific')}
              className={`lg:text-lg text-sm xxs:text-xs font-medium lg:font-semibold p-3 rounded-[5px] text-light70 dark:text-dark70 
              ${activeButton === 'requestSpecific' ? 'dark:bg-gray10 bg-lightgray dark:text-dark100 text-gray10 opacity-100' : 'bg-transparent opacity-70'}`}
            >
              Müraciət istəkləri
            </button>
          </div>
          {activeButton === 'requestPool' ? <RequestPool /> : <RequestSpecific />}
        </> : 
        <RequestUser />
      }
    </div>
  );
};

export default Request;



