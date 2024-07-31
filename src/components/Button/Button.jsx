import React from 'react'

const Button = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            type='submit'
            className="w-full h-[60px] xs:h-[50px] bg-light200 text-darkblack font-medium text-xl xs:text-base mb-6 xs:mb-3 rounded-[10px] hover:scale-95 transition-all duration-200" >
            {children}
        </button >
    )
}

export default Button
