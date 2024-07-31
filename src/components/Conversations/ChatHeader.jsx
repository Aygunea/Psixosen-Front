import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ChatHeader = () => {
    const selectedConversation = useSelector(state => state.conversation?.selectedConversation);
    const onlineUsers = useSelector(state => state.user.onlineUsers || []);
    const onlineListeners = useSelector(state => state.listener.onlineListeners || []);

    if (!selectedConversation) {
        return null;
    }

    // Check if the conversation ID is in the online users or listeners
    const isOnline = onlineUsers.includes(selectedConversation._id) || onlineListeners.includes(selectedConversation._id);
    const displayName = selectedConversation.nickname ? selectedConversation.nickname
        : selectedConversation.username

    return (
        <Link to={`../dinleyiciprofil`}>
            <div>
                {selectedConversation && (
                    <div className="flex items-center gap-4 px-6 py-[18px]">
                        {/* Left */}
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img
                                src={selectedConversation.profilePic}
                                alt="profile"
                                className="h-full w-full"
                            />
                        </div>
                        {/* Right */}
                        <div className="flex flex-col">
                            <h4 className="text-base font-medium text-darkblack dark:text-dark100 mb-[4px]">
                                {/* {selectedConversation.nickname} */}
                                {displayName}
                            </h4>
                            <p className='text-light50 dark:text-dark100 text-xs opacity-60'>
                                {isOnline ? 'Onlayn' : 'Offline'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ChatHeader;
