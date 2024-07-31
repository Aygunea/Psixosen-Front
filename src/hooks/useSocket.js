import { useEffect,useState } from 'react';
import { io } from 'socket.io-client';
import { addMessage, updateMessage } from '../slices/messages.slice';
import { useDispatch } from 'react-redux';

const useSocket = ({ userId, userType }) => {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        if (!userId || !userType) {
            return;
        }

        // Create a new socket connection
        const newSocket = io("http://localhost:5000", {
            query: {
                userId,
                userType
            }
        });

        // Log the socket connection ID
        newSocket.on('connect', () => {
            console.log('Connected:', newSocket.id);
        });

        newSocket.on('newMessage', (message) => {
            dispatch(addMessage(message));
        });

        newSocket.on('messageRead', (updatedMessage) => {
            dispatch(updateMessage(updatedMessage));
        });

        // Handle forced disconnection
        newSocket.on('forceDisconnect', () => {
            newSocket.disconnect();
            console.log('You have been disconnected from another device.');
        });

        // Set the new socket instance
        setSocket(newSocket);

        // Cleanup function to disconnect socket when component unmounts or userId/userType changes
        return () => {
            newSocket.disconnect();
            console.log('Socket disconnected');
        };
    }, [userId, userType]);

    return socket;
};

export default useSocket;

