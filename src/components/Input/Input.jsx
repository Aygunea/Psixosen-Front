import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, placeholder, id, type,autoComplete }, ref) => {
    return (
        <div className='flex flex-col gap-5 w-full h-full'>
            {/* <label className='text-light' htmlFor={id}>{label}</label> */}
            <input
                autoComplete={autoComplete}
                ref={ref}
                className='xs:text-sm border h-full text-dark100 placeholder:text-dark100 border-dark100 bg-transparent rounded-[5px] pl-[66px] xs:pl-10 py-[10px] outline-none'
                id={id} type={type} placeholder={placeholder}
            />
        </div>
    );
});

export default Input;
