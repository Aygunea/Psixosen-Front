import React, { useState } from 'react';
import { HiOutlineTrash } from "react-icons/hi2";
import PopupConfirm from '../Popup/PopupConfirm';

const Notification = ({ notification, onDelete }) => {
    const { title, message, createdAt } = notification;
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
    const formatDate = (sessionStartTime) => {
        if (!sessionStartTime) return { dateString: '', timeString: '' };
        const formattedTime = new Date(sessionStartTime);
        const day = formattedTime.getDate().toString().padStart(2, '0');
        const month = (formattedTime.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedTime.getFullYear().toString().slice(-2);
        const dateString = `${day}.${month}.${year}`;
        const timeString = formattedTime.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
        return { dateString, timeString };
      };
      const { dateString, timeString } = formatDate(createdAt);
    return (
        <div className='dark:bg-gray10 bg-lightgray py-3 md:py-4 md:px-8 px-4 rounded-[10px] flex justify-between transition duration-1000'>
            <div className='w-full'>
                <div className="flex items-center justify-between">
                    <p className='dark:text-dark100 text-gray10 text-lg'>
                        {title}
                    </p>
                    {!hover && (
                        <p className='dark:text-light50 text-light70 text-xs'>
                            {dateString && timeString ? `${dateString} | ${timeString}` : ''}
                        </p>
                    )}
                </div>
                <p className='dark:text-dark70 text-light70 md:text-sm text-xs'>
                    {message}
                </p>
            </div>
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


