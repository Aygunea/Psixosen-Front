// import React, { useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import Message from "./Message";
// import { addMessage, addUnReadMessage, setMessage, setUnReadMessages, updateMessage } from "../../slices/messages.slice";
// import useSocket from "../../hooks/useSocket";
// import { BiCheckDouble, BiCheck } from "react-icons/bi";

// const weekDays = [
//   "Bazar ertəsi", // Monday
//   "Çərşənbə axşamı", // Tuesday
//   "Çərşənbə",     // Wednesday
//   "Cümə axşamı",  // Thursday
//   "Cümə",         // Friday
//   "Şənbə",         // Saturday
//   "Bazar",        // Sunday
// ];

// const getHeaderForDate = (dateString) => {
//   const messageDate = new Date(dateString);
//   const now = new Date();

//   if (messageDate.toDateString() === now.toDateString()) {
//     return "Bugün";
//   }

//   const yesterday = new Date(now);
//   yesterday.setDate(now.getDate() - 1);
//   if (messageDate.toDateString() === yesterday.toDateString()) {
//     return "Dünən";
//   }
//   const oneWeekAgo = new Date(now);
//   oneWeekAgo.setDate(now.getDate() - 7);
//   if (messageDate >= oneWeekAgo) {
//     const dayIndex = messageDate.getDay(); 
//     return weekDays[dayIndex];
//   }

//   return messageDate.toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: '2-digit' }).split('.').reverse().join('.');;
// };


// const Messages = () => {
//   const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
//   const allMessages = useSelector((state) => state.messages.messages);
//   const dispatch = useDispatch();
//   const scrollElement = useRef();
//   const socket = useSocket();
//   // console.log(unReadMessages);
//   //read mark
//   // Mesajı okundu olarak işaretle
//   // const markMessageAsRead = async (messageId) => {
//   //   try {
//   //     await fetch(`http://localhost:3000/api/messages/read/${messageId}`, {
//   //       method: 'PATCH',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //     });
//   //     socket.emit('markAsRead', messageId); // WebSocket üzerinden gönder
//   //   } catch (error) {
//   //     console.error('Error marking message as read:', error);
//   //   }
//   // };
//   const unReadMessages = useSelector(state => state.messages.unReadMessages)

//   const getAllMessages = async () => {
//     try {
//       if (!selectedConversation) {
//         return console.log("No conversation selected");
//       }
//       let response;
//       if (selectedConversation?._id) {
//         response = await fetch(`http://localhost:3000/api/messages/${selectedConversation._id}`);
//       }

//       const data = await response.json();
//       const unreadMessages = data.filter(message => !message.read);
//       dispatch(setUnReadMessages(unreadMessages));
//       // console.log(unReadMessages);
//       if (!response.ok) {
//         return console.log(`Error fetching all messages`);
//       }
//       if (response.ok) {
//         dispatch(setMessage(data));
//       }
//     } catch (error) {
//       console.log(`Error fetching messages`);
//     }
//   };
//   // allMessages.map((message) => {
//   //   if (message.read === false) {
//   //     dispatch(addUnReadMessage(message));
//   //   }
//   // })

//   useEffect(() => {
//     getAllMessages();
//   }, [selectedConversation]);

//   useEffect(() => {
//     if (allMessages.length > 0) {
//       scrollElement?.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [allMessages, dispatch]);
//   // useEffect(() => {
//   //   if (allMessages.length > 0) {
//   //     scrollElement?.current.scrollIntoView({ behavior: 'smooth' })
//   //   }

//   //   socket.on("newMessage", (newMessage) => {
//   //     dispatch(addMessage(newMessage))
//   //   })
//   // }, [allMessages])
//   // console.log(allMessages);
//   const groupedMessages = allMessages.reduce((groups, message) => {
//     const date = message && message.createdAt?.split('T')[0];
//     if (!groups[date]) {
//       groups[date] = [];
//     }
//     groups[date].push(message);
//     return groups;
//   }, {});

//   // useEffect(() => {
//   //   if (allMessages.length > 0) {
//   //     scrollElement?.current.scrollIntoView({ behavior: 'smooth' });

//   //     // Mesajları okundu olarak işaretle
//   //     allMessages.forEach(msg => {
//   //       if (msg.sender.id === selectedConversation?._id && !msg.read) {
//   //         markMessageAsRead(msg._id); // Mesajın okunma durumunu güncelle
//   //       }
//   //     });
//   //   }
//   // }, [allMessages, dispatch]);
//   // WebSocket üzerinden mesaj okundu bilgisini dinle
//   // useEffect(() => {
//   //   socket.on('messageRead', (updatedMessage) => {
//   //     dispatch(updateMessage(updatedMessage));
//   //   });

//   //   return () => {
//   //     socket.off('messageRead');
//   //   };
//   // }, [dispatch, socket]);
//   return (
//     <div className="pb-0 rounded-2xl">
//       {Object.keys(groupedMessages).map((date, index) => (
//         <div key={index}>
//           <div className="my-9 flex justify-center items-center">
//             <span className="inline-block w-[100px] h-[1px] bg-light20 dark:bg-dark20"></span>
//             <p className="text-base text-light50 dark:text-dark50 text-center py-5 px-4">{getHeaderForDate(date)}</p>
//             <span className="inline-block w-[100px] h-[1px] bg-light20 dark:bg-dark20"></span>
//           </div>
//           {groupedMessages[date].map((msg, index) => {
//             const timeStyle = msg.sender && msg.sender.id === selectedConversation?._id ? "text-left text-light20" : "text-right text-light70";

//             const createdAt = new Date(msg.createdAt);
//             const timeString = createdAt.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
//             return (
//               // <div key={msg._id} ef={index === allMessages.length - 1 ? scrollElement : null}>
//               <Message
//                 key={index}
//                 type={msg.sender && msg.sender.id === selectedConversation?._id ? 'sent' : 'received'}
//               >
//                 <div className="flex gap-6">
//                   <p>{msg.message}</p>
//                   <div className=" flex justify-end items-center gap-1 pt-2">
//                     <p className={`text-[9px] ${timeStyle}`}>{timeString}</p>
//                     <p className={`text-light70 dark:text-dark70 text-lg`}>
//                       {msg.sender && msg.sender.id !== selectedConversation?._id
//                         ? (msg.read ? <BiCheckDouble className=" text-[#0F5A9D]" /> : <BiCheck />)
//                         : ''
//                       }
//                     </p>
//                   </div>
//                 </div>
//               </Message>
//               // </div>
//             );
//           })}
//         </div>
//       ))}
//       <div ref={scrollElement} />
//     </div>
//   );
// };

// export default Messages;

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import { addMessage, addUnReadMessage, setMessage, setUnReadMessages, updateMessage } from "../../slices/messages.slice";
import useSocket from "../../hooks/useSocket";
import { BiCheckDouble, BiCheck } from "react-icons/bi";

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
  const messageDate = new Date(dateString);
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

  return messageDate.toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: '2-digit' }).split('.').reverse().join('.');;
};


const Messages = () => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
  const allMessages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();
  const scrollElement = useRef();
  const socket = useSocket();
  const unReadMessages = useSelector(state => state.messages.unReadMessages);

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
      const unreadMessages = data.filter(message => !message.read);
      dispatch(setUnReadMessages(unreadMessages));
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

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
      scrollElement?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch, socket]);

  const groupedMessages = allMessages.reduce((groups, message) => {
    const date = message && message.createdAt?.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="pb-0 rounded-2xl">
      {Object.keys(groupedMessages).map((date, index) => (
        <div key={index}>
          <div className="my-9 flex justify-center items-center">
            <span className="inline-block w-[100px] h-[1px] bg-light20 dark:bg-dark20"></span>
            <p className="text-base text-light50 dark:text-dark50 text-center py-5 px-4">{getHeaderForDate(date)}</p>
            <span className="inline-block w-[100px] h-[1px] bg-light20 dark:bg-dark20"></span>
          </div>
          {groupedMessages[date].map((msg, index) => {
            const timeStyle = msg.sender && msg.sender.id === selectedConversation?._id ? 
            "text-left dark:text-dark70 text-light20" : "text-right dark:text-dark70 text-light70";

            const createdAt = new Date(msg.createdAt);
            const timeString = createdAt.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
            return (
              <Message
                key={index}
                type={msg.sender && msg.sender.id === selectedConversation?._id ? 'sent' : 'received'}
              >
                <div className="flex gap-6">
                  <p>{msg.message}</p>
                  <div className=" flex justify-end items-center gap-1 pt-2">
                    <p className={`text-[9px] ${timeStyle}`}>{timeString}</p>
                    <p className={`text-light70 dark:text-dark70 text-lg`}>
                      {msg.sender && msg.sender.id !== selectedConversation?._id
                        ? (msg.read ? <BiCheckDouble className=" text-[#0F5A9D]" /> : <BiCheck />)
                        : ''
                      }
                    </p>
                  </div>
                </div>
              </Message>
            );
          })}
        </div>
      ))}
      <div ref={scrollElement} />
    </div>
  );
};

export default Messages;
