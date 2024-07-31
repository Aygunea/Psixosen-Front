import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, placeholder, id, type, autoComplete,onChange,value,name}, ref) => {
    return (
        <div className='flex flex-col gap-1 w-full h-full'>
            <input
                className='xs:text-xs sm:text-sm text-base border h-full text-dark100 placeholder:text-dark100 border-dark100 bg-transparent rounded-[10px] pl-16 xs:pl-10 outline-none'
                ref={ref}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
});

export default Input;
