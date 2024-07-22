// import { io } from "socket.io-client";
// import { useSelector } from "react-redux";

// const useSocket = () => {
//     const user = useSelector(state => state.user.user);
//     const listener = useSelector(state => state.listener.listener); 
//     // console.log(user, listener);
//     const userType = user ? 'user' : listener ? 'listener' : null; 
//     // console.log(userType);
//     const socket = io("http://localhost:5000", {
//         query: {
//             userId: user?._id || listener?._id, 
//             userType: userType 
//         }
//     });
//     socket.on('connect', () => {
//         console.log('Bağlantı kuruldu:', socket.id);
//     });
    
//     // Mevcut bağlantının zorla kesildiği durumlarda
//     socket.on('forceDisconnect', () => {
//         socket.disconnect();
//         console.log('Bağlantınız başka bir cihazdan kesildi.');
//     });

//     return socket;
// }

// export default useSocket;

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

let socket;

const useSocket = () => {
    const user = useSelector(state => state.user.user);
    const listener = useSelector(state => state.listener.listener); 
    const userType = user ? 'user' : listener ? 'listener' : null; 
    const socketInitialized = useRef(false);

    useEffect(() => {
        if (!socketInitialized.current) {
            socket = io("http://localhost:5000", {
                query: {
                    userId: user?._id || listener?._id, 
                    userType: userType 
                }
            });

            socket.on('connect', () => {
                console.log('Bağlantı kuruldu:', socket.id);
            });
            
            socket.on('forceDisconnect', () => {
                socket.disconnect();
                console.log('Bağlantınız başqa bir cihazdan kesildi.');
            });

            socketInitialized.current = true;
        }

        return () => {
            if (socket) {
                socket.disconnect();
                socketInitialized.current = false;
            }
        };
    }, [user?._id, listener?._id, userType]);

    return socket;
}

export default useSocket;
