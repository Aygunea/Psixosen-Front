import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Complaint from './Complaint';
import Suggest from './Suggest';

const ComplaintAndInform = () => {
    const role = useSelector(state => state.role.role)
    const [activeButton, setActiveButton] = useState('complaint');

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className='xs:max-w-[460px]'>   
                <div className='flex gap-4 pb-8'>
                    <button
                        onClick={() => handleClick('complaint')}
                        className={`xs:text-base text-lg font-semibold p-[10px] w-[136px] xs:w-[120px] xs:rounded-[2px] rounded-[5px] text-light70 dark:text-dark70 
              ${activeButton === 'complaint' ? 'dark:bg-gray10 bg-lightgray dark:text-dark100 text-gray10 opacity-100' : 'border border-light20 dark:border-dark20 bg-transparent opacity-70'}`}
                    >
                        Şikayət
                    </button>
                    <button
                        onClick={() => handleClick('inform')}
                        className={`xs:text-base text-lg font-semibold p-[10px] w-[136px] xs:w-[120px] xs:rounded-[2px] rounded-[5px] text-light70 dark:text-dark70 
              ${activeButton === 'inform' ? 'dark:bg-gray10 bg-lightgray dark:text-dark100 text-gray10 opacity-100' : 'border border-light20 dark:border-dark20 bg-transparent opacity-70'}`}
                    >
                        Təklif
                    </button>
                </div>
                {activeButton === 'complaint' ? <Complaint /> : <Suggest />}
        </div>
    );
};

export default ComplaintAndInform; 

