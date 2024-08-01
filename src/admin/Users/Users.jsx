import React, { useState } from 'react';
import Talker from './Talker';
import Listeners from './Listeners';

const Users = () => {
    const [activeButton, setActiveButton] = useState('Danışan');

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className='lg:p-8 p-5'>
            <div className='flex gap-4 pb-8'>
                <button
                    onClick={() => handleClick('Danışan')}
                    className={`lg:w-[150px] w-20 text-sm lg:text-lg font-semibold p-3 rounded-[5px] text-light70 
              ${activeButton === 'Danışan' ? 'text-darkblack bg-lightgray opacity-100' : 'bg-transparent opacity-70'}`}
                >
                    Danışan
                </button>
                <button
                    onClick={() => handleClick('Dinləyici')}
                    className={`lg:w-[150px] w-20 text-sm lg:text-lg font-semibold p-3 rounded-[5px] text-light70 
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


