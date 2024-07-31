import React from 'react';
import { formatDate } from '../../Functions/formatDate';
import { useSelector } from 'react-redux';

const SingleContact = ({ contact, onClick, lastMessage }) => {
    const role = useSelector(state => state.role.role);

    // Display last message details
    const displayDate = lastMessage ? formatDate(lastMessage.createdAt) : '';
    const displayMessage = lastMessage ? lastMessage.message : '';
    return (
        <div
            onClick={onClick}
            className="grid grid-cols-[auto_1fr] gap-4 border-b dark:border-dark20 border-light20 py-[13px]">
            {/* Left */}
            <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                    src={contact.profilePic}
                    alt="profile"
                    className="h-full w-full"
                />
            </div>
            {/* Right */}
            <div className="flex ">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm dark:text-dark100 text-gray10 mb-[6px]">
                        {role === 'user' ? contact.nickname : contact.username}
                    </h4>
                    {/* <p className='text-light50 dark:text-dark50 text-xs'>
                        {displayDate}
                    </p> */}
                </div>
                {/* <div className="flex justify-between items-center">
                    <p className='text-light50 dark:text-dark50 text-xs'>
                        {displayMessage}
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default SingleContact;
