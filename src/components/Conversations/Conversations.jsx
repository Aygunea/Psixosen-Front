import React, { useState } from 'react';
import Head from './Head';
import Contact from './Contact';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { setselectedConversation } from '../../slices/conversations.slice';


// const Conversations = () => {
//   const [activeTab, setActiveTab] = useState('Söhbətlər');

//   return (
//     <div className='h-full grid grid-rows-[auto_1fr]'>
//       <div className="grid grid-cols-[350px_1fr] xs:auto-cols-auto py-[18px]">
//         <Head activeTab={activeTab} setActiveTab={setActiveTab} />
//         <ChatHeader />
//       </div>
//       <div className='xs:auto-cols-auto sm:grid sm:grid-cols-[350px_1fr] sm:overflow-hidden'>
//         <Contact activeTab={activeTab} />
//         <Chat />
//       </div>
//     </div>
//   );
// };

// export default Conversations;

// const Conversations = () => {

//   return (
//     <div className='h-full grid grid-rows-[auto_1fr]'>
//       <div className="grid grid-cols-[350px_1fr] ">
//         <Head />
//         <ChatHeader />
//       </div>
//       <div className='grid grid-cols-[350px_1fr] overflow-hidden'>
//         <Contact />
//         <Chat />
//       </div>
//     </div>
//   );
// };

// export default Conversations;

// const Conversations = () => {
//   const dispatch = useDispatch();
//   const selectedConversation = useSelector((state) => state.conversation.selectedConversation);

//   const handleContactSelect = (contact) => {
//     dispatch(setselectedConversation(contact));
//   };


//     return (
//       <div className='h-full grid grid-rows-[auto_1fr] lg:grid-cols-[350px_1fr] lg:grid-rows-[auto_1fr]'>
//       {/* Başlık */}
//       <div className="lg:hidden">
//         <Head />
//       </div>
//       <div className="hidden lg:grid lg:grid-cols-[350px_1fr]">
//         <Head />
//         {selectedConversation && <ChatHeader />}
//       </div>

//       <div className='relative h-full overflow-hidden lg:grid lg:grid-cols-[350px_1fr]'>
//         {/* Kişiler Listesi */}
//         <div className='lg:col-start-1 lg:col-end-2'>
//           <Contact onContactSelect={handleContactSelect} />
//         </div>

//         {/* Sohbet */}
//         <div className='lg:col-start-2 lg:col-end-3'>
//           {selectedConversation ? (
//             <>
//               <ChatHeader />
//               <Chat />
//             </>
//           ) : (
//             <div className='lg:hidden'>
//               <p className='text-center py-4'>Kişi seçin ve sohbet başlatın.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     );
//   };



// export default Conversations;


const Conversations = () => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);

  const handleContactSelect = (contact) => {
    dispatch(setselectedConversation(contact));
  };
  const isConversationValid = (conversation) => {
    return conversation && Object.keys(conversation).length > 0;
  };
  return (
    <>
      <div className='h-full grid grid-rows-[auto_1fr]'>
        <div className="hidden lg:grid grid-cols-[350px_1fr] ">
          <Head />
          <ChatHeader />
        </div>
        <div className='hidden lg:grid grid-cols-[350px_1fr] overflow-hidden'>
          <Contact />
          <Chat />
        </div>

        {!isConversationValid(selectedConversation) ? (
          <>
            <div className="lg:hidden block">
              <Head />
            </div>
            <div className="lg:hidden block">
              <Contact onContactSelect={handleContactSelect} />
            </div>
          </>
        ) : (
          <div className='hidden xs:flex flex-col flex-grow'>
            <ChatHeader />
            <div className='hidden xs:flex-grow overflow-y-auto'>
              <Chat />
            </div>
          </div>
          // <div className='xs:grid grid-rows-[auto_1fr] overflow-hidden h-full'>
          //   <div className="lg:hidden block">
          //     <ChatHeader />
          //   </div>
          //   <div className="lg:hidden block">
          //     <Chat />
          //   </div>
          // </div>
        )}
        {/* {selectedConversation ? (
        <>
          <ChatHeader />
          <Chat />
        </>
      ) : (
        <>
          <div className="lg:hidden block">
            <Head />
          </div>
          <div className="lg:hidden block">
            <Contact onContactSelect={handleContactSelect} />
          </div>
        </>
      )} */}


      </div>
    </>

  );
};

export default Conversations;