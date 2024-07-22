import React from 'react'

const Button = ({ children }) => {
    return (
        <button
            type='submit'
            className="w-full h-13 bg-light200 text-darkblack font-medium text-xl mb-6 rounded-[10px] hover:scale-95 transition-all duration-200">
            {children}
        </button>
    )
}

export default Button