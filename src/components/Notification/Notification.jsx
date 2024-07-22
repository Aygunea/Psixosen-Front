import React, { useState } from 'react';
import { HiOutlineTrash } from "react-icons/hi2";
import PopupConfirm from '../Popup/PopupConfirm';

const Notification = ({ notification, onDelete }) => {
    const { title, message, createdAt } = notification;
    const formattedTime = new Date(createdAt)
    const timeString = formattedTime.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
    const [hover, setHover] = useState(false);
    //popup
    const [popupVisible, setPopupVisible] = useState(false);

    const closePopup = () => {
        setPopupVisible(false);
    };
    const handleDelete = () => {
        onDelete(notification._id);
        closePopup();
    };
    return (
        <div className='dark:bg-gray10 bg-lightgray py-4 px-8 rounded-[10px] flex justify-between transition duration-1000'
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className='w-full'>
                <div className="flex items-center justify-between">
                    <p className='dark:text-dark100 text-gray10 text-lg'>
                        {title}
                    </p>
                    {!hover && (
                        <p className='dark:text-light50 text-light70 text-base'>
                            {timeString}
                        </p>
                    )}
                </div>
                <p className='dark:text-dark70 text-light70 text-sm'>
                    {message}
                </p>
            </div>
            {hover && (
                <div
                    className={`w-[38px] h-10 dark:bg-darkred300 dark:text-dark100 flex justify-center items-center text-lg rounded-[5px] cursor-pointer transition-opacity duration-1000 ${hover ? 'opacity-100' : 'opacity-0'} ${hover ? 'visible' : 'invisible'}`}
                    onClick={() => setPopupVisible(true)}
                >
                    <HiOutlineTrash />
                </div>
            )}
            {
                popupVisible && <PopupConfirm
                    message={"Bu bildirişi silmək istədiyinizə əminsinizmi?"}
                    onClose={closePopup}
                    onClick={handleDelete} />
            }
        </div>
    );
};

export default Notification;


