import React from 'react'

const MusicItem = () => {
    return (
        <button className='w-[170px] xs:w-[135px]'>
            <img className='h-[150px] xs:h-[114px] w-full object-cover rounded-[5px] mb-3' src={require('../../images/music2.jpeg')} alt="" />
            <div className="flex flex-col gap-1 xs:gap-[2px] text-left">
                <p className='dark:text-dark100 text-gray10 text-base xs:text-xs'>Nuvole Bianche</p>
                <p className='dark:text-dark50 text-light50 text-sm xs:text-[10px]'>Ludovico Einaudi</p>
            </div>
        </button>
    )
}

export default MusicItem
