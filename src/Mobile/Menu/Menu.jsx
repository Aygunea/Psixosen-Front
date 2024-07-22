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
            className='xs:block hidden xs:fixed xs:z-10 xs:top-1/2 xs:-translate-y-1/2 xs:right-0 xs:text-dark100'>
            <PiSquaresFour className='w-6 h-6' />
            {isopen && (
                <div className='xs:block hidden dark:bg-darkblack'>
                    <MenuBar />
                </div>
            )}
        </button>
    )
}

export default Menu