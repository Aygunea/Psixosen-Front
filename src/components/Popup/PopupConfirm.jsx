import React from 'react';

const PopupConfirm = ({ message, onClose, onClick }) => {

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30' onClick={onClose}>
            <div className='w-[500px] py-8 dark:bg-popupdark bg-popuplight rounded-lg flex justify-center items-center shadow-custom'
                onClick={(e) => e.stopPropagation()}>
                <div className='w-[320px] flex flex-col items-center gap-14 '>
                    <div className='w-full text-center bg-lightgray dark:bg-dark300 dark:text-dark100 text-gray10 text-lg rounded-[8px] p-8'>
                        {message}
                    </div>
                    <div className='w-full flex justify-center items-center gap-4'>
                        <button
                            onClick={onClose}
                            className={`w-full text-sm rounded-[5px] p-[10px] text-dark100 dark:bg-reddark300 bg-redlight300`}>
                            Ləğv et
                        </button>
                        <button
                            onClick={onClick}
                            className={`w-full text-sm rounded-[5px] p-[10px] text-dark100 dark:bg-green bg-lightgreen`}>
                            Təsdiq et
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupConfirm;

