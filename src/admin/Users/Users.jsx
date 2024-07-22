import React, { useState } from 'react';
import Talker from './Talker';
import Listeners from './Listeners';

const Users = () => {
    const [activeButton, setActiveButton] = useState('Danışan');

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className='p-8'>
            <div className='flex gap-4 pb-8'>
                <button
                    onClick={() => handleClick('Danışan')}
                    className={`w-[150px] text-lg font-semibold p-3 rounded-[5px] text-light70 
              ${activeButton === 'Danışan' ? 'text-darkblack bg-lightgray opacity-100' : 'bg-transparent opacity-70'}`}
                >
                    Danışan
                </button>
                <button
                    onClick={() => handleClick('Dinləyici')}
                    className={`w-[150px] text-lg font-semibold p-3 rounded-[5px] text-light70 
              ${activeButton === 'Dinləyici' ? 'text-darkblack bg-lightgray opacity-100' : 'bg-transparent opacity-70'}`}
                >
                    Dinləyici
                </button>
            </div>
            {activeButton === 'Danışan' ? <Talker /> : <Listeners />}
        </div>
    );
};

export default Users;


