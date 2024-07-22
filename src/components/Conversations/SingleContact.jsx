import React from 'react'
import { formatDate } from '../../Functions/formatDate';
import { useSelector } from 'react-redux';

const SingleContact = ({ contact, onClick, lastMessage }) => {
    const role = useSelector(state => state.role.role)
    const unReadMessages = useSelector(state => state.messages.unReadMessages)
    // console.log(unReadMessages);
    // console.log("Contact ID:", contact._id);
    // const contactUnreadMessages = unReadMessages.filter(msg => msg.sender.id === contact._id);
    // const contactUnreadMessages = unReadMessages.filter(msg => console.log(msg.sender.id) );

    // console.log(contactUnreadMessages);

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
            <div className="flex flex-col ">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm dark:text-dark100 text-gray10 mb-[6px]">
                        {role === 'user' ? contact.nickname : contact.username}
                    </h4>
                    <p className='text-light50 dark:text-dark50 text-xs'>
                        {formatDate(lastMessage ? lastMessage.createdAt : '')}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className='text-light50 dark:text-dark50 text-xs'>
                        {lastMessage ? lastMessage.message : ''}
                    </p>
                    {/* {
                        contactUnreadMessages.length > 0 && (
                            <div className='w-[14px] h-[14px] rounded-full bg-green dark:text-darkblack text-dark100 text-[8px] flex items-center justify-center'>
                                {contactUnreadMessages.length}
                            </div>
                        )
                    } */}
                </div>
            </div>
        </div>
    )
}

export default SingleContact
