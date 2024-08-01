import React, { useState } from 'react'
import { PiSquaresFour } from "react-icons/pi";
import MenuBar from '../../components/Sidebar/Menu'

const Menu = () => {
    const [isopen, setisOpen] = useState(false)
    const showMenu = () => {
        setisOpen(!isopen)
    }
    return (
        <button
            onClick={showMenu}
            className='flex items-center flex-col gap-2 lg:hidden fixed z-10 top-1/2 -translate-y-1/2 right-0 text-dark100'>
            <PiSquaresFour className='w-6 h-6' />
            {isopen && (
                <div className='block lg:hidden dark:bg-darkblack py-4'>
                    <MenuBar />
                </div>
            )}
        </button>
    )
}

export default Menu