import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useSocket from '../../hooks/useSocket';
import { setOnlineListeners } from '../../slices/listener.slice';
import { setOnlineUsers } from '../../slices/userSlice';

// const ChatHeader = () => {
//     const dispatch = useDispatch();
//     const socket = useSocket();
//     const selectedConversation = useSelector(state => state.conversation?.selectedConversation);
//     const onlineUsers = useSelector(state => state.user.onlineUsers);
//     const onlineListeners = useSelector(state => state.listener.onlineListeners);
    
//     const [isOnline, setIsOnline] = useState(false);

//     useEffect(() => {
//         if (!selectedConversation) return;

//         const userId = selectedConversation._id;

//         const handleOnlineUsers = (onlineUsers) => {
//             dispatch(setOnlineUsers(onlineUsers));
//             setIsOnline(onlineUsers.includes(userId));
//         };

//         const handleOnlineListeners = (onlineListeners) => {
//             dispatch(setOnlineListeners(onlineListeners));
//             setIsOnline(onlineListeners.includes(userId));
//         };

//         socket.on("getOnlineUsers", handleOnlineUsers);
//         socket.on("getOnlineListeners", handleOnlineListeners);

//         return () => {
//             socket.off("getOnlineUsers", handleOnlineUsers);
//             socket.off("getOnlineListeners", handleOnlineListeners);
//         };
//     }, [selectedConversation, socket, dispatch]);

//     useEffect(() => {
//         if (selectedConversation) {
//             const userId = selectedConversation._id;
//             setIsOnline(
//                 onlineUsers.includes(userId) || onlineListeners.includes(userId)
//             );
//         }
//     }, [onlineUsers, onlineListeners, selectedConversation]);

//     if (!selectedConversation) {
//         return null; 
//     }

//     return (
//         <Link to={`../dinleyiciprofil`}>
//             <div>
//                 {selectedConversation && (
//                     <div className="flex items-center gap-4 px-6 py-[18px]">
//                         {/* Left */}
//                         <div className="h-12 w-12 rounded-full overflow-hidden">
//                             <img
//                                 src={selectedConversation.profilePic}
//                                 alt="profile"
//                                 className="h-full w-full"
//                             />
//                         </div>
//                         {/* Right */}
//                         <div className="flex flex-col">
//                             <h4 className="text-base font-medium text-darkblack dark:text-dark100 mb-[4px]">
//                                 {selectedConversation.nickname}
//                             </h4>
//                             <p className='text-light50 dark:text-dark100 text-xs opacity-60'>
//                                 {isOnline ? 'Onlayn' : 'Offline'}
//                             </p>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </Link>
//     );
// };

// export default ChatHeader;
const ChatHeader = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    const selectedConversation = useSelector(state => state.conversation?.selectedConversation);
    const onlineUsers = useSelector(state => state.user.onlineUsers);
    const onlineListeners = useSelector(state => state.listener.onlineListeners);

    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if (!socket) {
            console.error('Socket object is undefined');
            return;
        }

        if (!selectedConversation) return;

        const userId = selectedConversation._id;

        const handleOnlineUsers = (onlineUsers) => {
            dispatch(setOnlineUsers(onlineUsers));
            setIsOnline(onlineUsers.includes(userId));
        };

        const handleOnlineListeners = (onlineListeners) => {
            dispatch(setOnlineListeners(onlineListeners));
            setIsOnline(onlineListeners.includes(userId));
        };

        socket.on("getOnlineUsers", handleOnlineUsers);
        socket.on("getOnlineListeners", handleOnlineListeners);

        return () => {
            if (socket) {
                socket.off("getOnlineUsers", handleOnlineUsers);
                socket.off("getOnlineListeners", handleOnlineListeners);
            }
        };
    }, [selectedConversation, socket, dispatch]);

    useEffect(() => {
        if (selectedConversation) {
            const userId = selectedConversation._id;
            setIsOnline(
                onlineUsers.includes(userId) || onlineListeners.includes(userId)
            );
        }
    }, [onlineUsers, onlineListeners, selectedConversation]);

    if (!selectedConversation) {
        return null; 
    }

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
                                {selectedConversation.nickname}
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
