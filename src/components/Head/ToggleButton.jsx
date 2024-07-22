// ToggleButton.js
import React, { useState } from 'react';
import { LuSun } from "react-icons/lu";
import { PiMoon } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../slices/theme.slice';

const ToggleButton = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <button
            className="w-20 h-9 relative flex items-center bg-[#E1E1DB] dark:bg-darkgray rounded-[31px] outline-none"
            onClick={handleToggle}
        >
            <div className={`absolute left-2 z-10 ${darkMode ? 'text-dark70' : 'text-dark100'}`}>
                <LuSun />
            </div>
            <div className={`absolute right-2 z-10 ${darkMode ? 'text-dark100' : 'text-blue50'}`}>
                <PiMoon />
            </div>
            <div
                className={`w-9 h-9 absolute rounded-full bg-lightblue dark:bg-blue100 transition-transform duration-300 ${darkMode ? 'transform translate-x-11' : 'transform translate-x-0'}`}
            >
            </div>
        </button>
    );
};

export default ToggleButton;
