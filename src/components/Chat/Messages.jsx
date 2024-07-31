import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import { setMessage, setUnReadMessages, updateMessage } from "../../slices/messages.slice";
import { BiCheckDouble, BiCheck } from "react-icons/bi";
import generateItems from '../../generateItems'

const weekDays = [
  "Bazar ertəsi",
  "Çərşənbə axşamı",
  "Çərşənbə",
  "Cümə axşamı",
  "Cümə",
  "Şənbə",
  "Bazar",
];

const getHeaderForDate = (dateString) => {
  if (!dateString) return 'Invalid Date';

  const [year, month, day] = dateString.split('-');
  const messageDate = new Date(year, month - 1, day);

  if (isNaN(messageDate)) return 'Invalid Date';

  const now = new Date();
  if (messageDate.toDateString() === now.toDateString()) {
    return "Bugün";
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Dünən";
  }

  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  if (messageDate >= oneWeekAgo) {
    const dayIndex = messageDate.getDay();
    return weekDays[dayIndex];
  }

  return messageDate.toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: '2-digit' }).split('.').reverse().join('.');
};

const Messages = () => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
  const allMessages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();
  const scrollElement = useRef();
  // const socket = useSocket();
  const unReadMessages = useSelector(state => state.messages.unReadMessages);

  const markMessagesAsRead = async (messageIds) => {
    try {
      const response = await fetch('http://localhost:3000/api/messages/read', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark messages as read');
      }

      const result = await response.json();
      console.log(result.message); // Optional: log success message
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const getAllMessages = async () => {
    try {
      if (!selectedConversation) {
        return console.log("No conversation selected");
      }
      let response;
      if (selectedConversation?._id) {
        response = await fetch(`http://localhost:3000/api/messages/${selectedConversation._id}`);
      }

      const data = await response.json();

      if (!response.ok) {
        return console.log(`Error fetching all messages`);
      }
      if (response.ok) {
        dispatch(setMessage(data));
      }
    } catch (error) {
      console.log(`Error fetching messages`);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, [selectedConversation]);

  useEffect(() => {
    if (allMessages.length > 0) {
      scrollElement?.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [allMessages, dispatch]);

  const items = generateItems(allMessages);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="pb-0 rounded-2xl">
      {items.map((item, index) => {
        if (item.type === 'day') {
          return (
            <div key={index} className="my-9 flex justify-center items-center">
              <span className="inline-block w-[100px] h-[1px] bg-light20 dark:bg-dark20"></span>
              <p className="text-base text-light50 dark:text-dark50 text-center py-5 px-4">
                {getHeaderForDate(item.date)}
              </p>
              <span className="inline-block w-[100px] h-[1px] bg-light20 dark:bg-dark20"></span>
            </div>
          );
        }
        const msg = item;
        const timeStyle = msg.sender && msg.sender.id === selectedConversation?._id
          ? "text-left dark:text-dark70 text-light20"
          : "text-right dark:text-dark70 text-light70";

        return (
          <Message
            key={index}
            type={msg.sender && msg.sender.id === selectedConversation?._id ? 'sent' : 'received'}
          >
            <div className="flex gap-6">
              <p>{msg.message}</p>
              <div className=" flex justify-end items-center gap-1 pt-2">
                <p className={`text-[9px] ${timeStyle}`}>
                  {formatTime(msg.createdAt)}
                </p>
                {/* <p className={`text-light70 dark:text-dark70 text-lg`}>
                  {msg.sender && msg.sender.id !== selectedConversation?._id
                    ? (msg.read ? <BiCheckDouble className="text-[#0F5A9D]" /> : <BiCheck />)
                    : ''
                  }
                </p> */}
              </div>
            </div>
          </Message>
        );
      })}
      <div ref={scrollElement} />
    </div>
  );
};

export default Messages;

