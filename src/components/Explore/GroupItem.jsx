import React from 'react'
import { MdOutlineAccessTime } from "react-icons/md";
import { TbUsersPlus } from "react-icons/tb";

const GroupItem = () => {
    return (
        <button className='relative w-[173px] xs:w-[135px] shadow-custom-effect'>
            <img className='h-[150px] xs:h-[114px] w-full object-cover' src={require('../../images/listener2.jpeg')} alt="" />
            <div className="absolute bottom-0 h-[47px] w-full flex flex-col gap-1 bg-gray10 opacity-60 blur-sm">

            </div>
            <div className="absolute bottom-[5px] z-10 px-[10px]">
                    <p className='text-dark100 py-[5px] text-xs'>Karyera İnkişaf Qrupu</p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-[5px]">
                            <MdOutlineAccessTime className='text-dark100' />
                            <p className='text-xs xs:text-[10px] text-dark70'>6 saat </p>
                        </div>
                        <div className="flex items-center gap-[5px]">
                            <TbUsersPlus className='text-dark100' />
                            <p className='text-xs xs:text-[10px] text-dark70'>7/10 </p>
                        </div>
                    </div>
                </div>
        </button>
    )
}

export default GroupItem
