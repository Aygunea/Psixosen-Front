import React from 'react';
import { VscMusic } from "react-icons/vsc";
import { WiTime2 } from "react-icons/wi";
import { HiOutlineTrash } from "react-icons/hi2";

const MusicItem = ({music,number}) => {
    const coverImageUrl = `http://localhost:3000/${music.coverImage}`
    
    return (
        <div className='py-6 px-[58px] flex justify-between border-b border-light20 hover:bg-lightgray duration-300 duration' onClick={music.onClick}>
            <div className="flex items-center w-full">
                <div className='text-light70 mr-[17.5px] text-sm'>
                    #{number}
                </div>
                <div className='w-[50px] h-[50px] mr-6'>
                    <img src={coverImageUrl} className='object-cover w-full h-full' alt="" />
                </div>
                <div className="flex flex-col gap-[5px]">
                    <p className='text-gray10 text-sm'>
                        {music.artist}
                    </p>
                    <p className='text-light50 text-xs'>
                        {music.title}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-between w-full'>
                <div className='text-gray10 text-sm'>
                    {music.title}
                </div>
                <div className="flex items-center gap-[79px]">
                    <div className='text-light50 flex items-center gap-3 text-sm'>
                        <VscMusic className="w-4 h-4" />
                        <p>{music.watchCount}</p>
                    </div>
                    <div className='text-light50 flex items-center gap-3 text-sm'>
                        <WiTime2 className="w-4 h-4" />
                        <p>{music.duration}</p>
                    </div>
                    <div className='text-light50 text-sm'>
                        <HiOutlineTrash className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicItem;
