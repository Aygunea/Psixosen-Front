// import React from 'react'
// import { MdOutlineStar } from "react-icons/md";

// const Popup = () => {
//     return (
//         <div className='w-full h-screen bg-dark flex items-center justify-center '>
//             <div className='w-[600px] bg-[#1E1E1E] rounded-[10px] px-[84px] py-7 flex items-center justify-center flex-col'>
//                 <div className="text-dark100 font-medium text-lg mb-7">
//                     Seansı dəyərləndirin
//                 </div>
//                 <div className="flex items-center justify-center gap-[6px] my-8">
//                     <MdOutlineStar className='w-5 h-5 text-[#B2A100]' />
//                     <MdOutlineStar className='w-5 h-5 text-[#B2A100]' />
//                     <MdOutlineStar className='w-5 h-5 text-[#B2A100]' />
//                     <MdOutlineStar className='w-5 h-5 text-dark300' />
//                     <MdOutlineStar className='w-5 h-5 text-dark300' />
//                 </div>
//                 <input type="text"
//                 className='w-full mb-7' />
//                 <textarea type="text" placeholder='Şərhinizi buraya yazın...'
//                     className="w-full placeholder-light70 h-[97px] text-sm py-4 px-6 mb-8 outline-none dark:bg-dark300 bg-lightgray text-dark50 rounded-[5px]"
//                 ></textarea>
//                 <div className='flex gap-8 w-full'>
//                     <button className='w-full py-[10px] text-base bg-[#931515] text-dark100 rounded-[5px]'>
//                         Ləğv et
//                     </button>
//                     <button className='w-full py-[10px] text-base bg-[#1B7D2B] text-dark100 rounded-[5px]'>
//                         Göndər
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Popup
import React from 'react';
import { IoMdClose } from "react-icons/io";
import { RiCloseLargeLine } from "react-icons/ri";

const Popup = ({ message, onClose, type }) => {
    const isSuccess = type === 'success';

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={onClose}>
            <div className='relative w-[600px] py-8 flex flex-col dark:bg-popupdark bg-popuplight rounded-lg items-center shadow-custom'
                onClick={(e) => e.stopPropagation()}>
                <div className={`w-[72px] h-[72px] text-2xl rounded-full mb-[66px] ${isSuccess ? 'dark:bg-green bg-lightgreen' : 'dark:bg-reddark300 bg-redlight300'} text-dark100 flex items-center justify-center`}>
                    {isSuccess ? <RiCloseLargeLine /> : <RiCloseLargeLine />}
                </div>
                <div className='w-[375px] dark:text-dark70 text-light70 text-lg mb-[97px] flex flex-col text-center items-center gap-3'>
                    <p className='dark:text-dark100 text-gray10 text-2xl'>{isSuccess ? 'Uğurlu' : 'Uğursuz'}</p>
                    {message}
                </div>
                <button className='absolute top-[37.5px] right-[37.5px] dark:text-dark70 text-light70' onClick={onClose}>
                    <IoMdClose />
                </button>
                <button
                    onClick={onClose}
                    className={`w-[262px] text-sm rounded-[38px] p-[10px] text-dark100 ${isSuccess ? 'dark:bg-green bg-lightgreen' : 'dark:bg-reddark300 bg-redlight300'}`}>
                    {isSuccess ? 'Tamam' : 'Yenidən cəhd elə'}
                </button>
            </div>
        </div>
    );
};

export default Popup;

