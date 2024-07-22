import React, { forwardRef } from 'react';
import { HiOutlineCheck } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const Input = forwardRef(({ label, placeholder, showPassword, toggleShowPassword, onChange, children, showCheck, hideCloseIcon, forceShowCheck }, ref) => {
    return (
        <div className='flex flex-col w-[428px] xs:w-full'>
            <label className='dark:text-dark100 text-gray10 text-lg xs:text-sm font-medium mb-5 flex gap-4 items-center' htmlFor={label}>
                {label}
                {(showCheck !== null || forceShowCheck) && !hideCloseIcon && (
                    <div className={`w-5 h-5 p-1 xs:w-4 xs:h-4 rounded-full flex items-center justify-center ${ (showCheck || forceShowCheck) ? 'bg-blue100 text-dark100' : ''}`}>
                        {(showCheck || forceShowCheck) && 
                            <HiOutlineCheck className='w-3 xs:w-[6px] font-bold' />}
                    </div>
                )}
            </label>
            <div className={`w-full border ${showCheck === false ? 'border-reddark' : 'dark:border-dark20 border-light20'} text-dark100 flex items-center justify-between rounded-[5px] p-6 xs:p-4 py-[10px]`}>
                <input
                    ref={ref}
                    className="w-full xs:text-xs text-gray10 dark:text-dark100 bg-transparent outline-none placeholder:dark:text-dark100 placeholder:text-gray10"
                    id={label}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    className={`xs:text-sm cursor-pointer flex items-center justify-center`}
                >
                    {!showPassword ? (
                        <IoEyeOffOutline className="text-light50 dark:text-dark50" />
                    ) : (
                        <IoEyeOutline className=" text-light50 dark:text-dark50" />
                    )}
                </button>
            </div>
            <p className={`mt-2 text-sm ${showCheck === false ? 'text-reddark' : ''}`}>{children}</p>
        </div>
    );
});

export default Input;
