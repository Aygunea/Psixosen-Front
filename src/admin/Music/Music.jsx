import React from 'react'
import MusicList from './MusicList'
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Music = () => {
  return (
    <div className='py-8'>
      <div className="flex justify-end items-center mb-4 px-8">
        <Link to='addplaylist'>
          <button className='bg-lightgray text-gray10 py-3 px-6 rounded-[5px] text-sm font-medium flex items-center justify-center gap-[10px]'>
            <FaPlus />
            Yeni pleylist yarat
          </button>
        </Link>
      </div>
      <div className="flex justify-between items-center px-8">
        <p className='text-xl text-light70'>Mahnılar</p>
        <Link to='addmusic'>
          <button className='bg-lightgray text-gray10 py-3 px-6 rounded-[5px] text-sm font-medium flex items-center justify-center gap-[10px]'>
            <FaPlus />
            Yeni mahnı əlavə et
          </button>
        </Link>
      </div>
      <MusicList />
    </div>
  )
}

export default Music 
