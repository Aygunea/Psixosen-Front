import React from 'react';
import { VscMusic } from "react-icons/vsc";
import { IoHeartSharp } from "react-icons/io5";
import { WiTime2 } from "react-icons/wi";
import { RiVoiceprintLine } from "react-icons/ri";
import { GoHeart } from 'react-icons/go';

const PopularItem = ({ title, number, duration, artist, watchCount, coverImage, onClick }) => {
    const coverImageUrl = `http://localhost:3000/${coverImage}`

    return (
        <div className='py-6 xs:py-3 flex justify-between border-b dark:border-dark20' onClick={onClick}>
            <div className="flex items-center w-full">
                <div className='dark:text-dark70 text-light70 mr-[17.5px] xs:mr-2 text-sm xs:text-xs'>
                    #{number}
                </div>
                <div className='w-[50px] h-[50px] mr-6 xs:mr-3 rounded-[5px] overflow-hidden'>
                    <img src={coverImageUrl} className='object-cover w-full h-full' alt="" />
                </div>
                <div className="flex flex-col gap-[5px] xs:gap-[2px]">
                    <p className='dark:text-dark100 text-gray10 text-sm'>
                        {artist}
                    </p>
                    <p className='xs:block hidden dark:text-dark50 text-light50 text-xs xs:text-[10px]'>
                        {title}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-between xs:justify-end w-full'>
                <div className='xs:hidden block dark:text-dark100 text-gray10 text-sm'>
                    {title}
                </div>
                <div className="flex items-center gap-[79px]">
                    <div className='xs:hidden block'>
                        <div className='dark:text-dark50 text-light50 flex items-center gap-3 text-sm'>
                            <VscMusic className="xs:text-xs text-base" />
                            <p>{watchCount}</p>
                        </div>
                    </div>
                    <div className='xs:hidden block'>
                    <div className='dark:text-dark50 text-light50 flex items-center gap-3 text-sm'>
                        <WiTime2 className="xs:text-xs text-base" />
                        <p>{duration}</p>
                    </div>
                    </div>
                    <div className='dark:text-dark50 text-light50 text-sm'>
                        <GoHeart className="xs:text-xs text-base xs:w-3 xs:h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularItem;
