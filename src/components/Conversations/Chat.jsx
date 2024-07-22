import React, { useState } from 'react'
import SendMessage from './SendMessage'
import Messages from '../Chat/Messages'
import PrivateChat from '../Chat/PrivateChat'
import CloseEye from "../../icons/CloseEye";
import OpenEye from "../../icons/OpenEye";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Chat = () => {
    const [privateChat, setPrivateChat] = useState(false)
    const selectedConversation = useSelector(state => state.conversation?.selectedConversation);

    const toggleClick = () => {
        setPrivateChat(!privateChat)
    }
    return (
            <div className='sm:flex sm:flex-col overflow-y-auto relative w-full h-full p-6 pr-0 bg-lightwhite dark:bg-darkblack rounded-tr-[10px] rounded-br-[10px] '>
                {selectedConversation ? (
                    <>
                        {/* <div
                            onClick={toggleClick}
                            className='w-[38px] h-[35px] bg-dark100 rounded-[5px] flex justify-center items-center absolute right-9'>
                            {privateChat ? <CloseEye className="w-4 h-4" color="#171717" /> : <OpenEye className="w-4 h-4" color="#171717" />}
                        </div>
                        {privateChat ? <PrivateChat /> : null} */}
                        <div className="flex-grow overflow-y-auto scrollbar pr-6">
                            <Messages />
                        </div>
                        <SendMessage />
                    </>
                ) : (
                    <div className='xs:hidden sm:flex gap-6 flex-col h-full justify-center items-center text-center py-[17px]'>
                        <div className='w-[80%]'>
                            <p className='dark:text-dark100 text-gray10 text-4xl mb-3'>Anonim Dinləyici Çatı</p>
                            <div className='dark:text-dark70 text-light70 mb-4'>
                                Təsadüfi mütəxəssis seçimi əsasında Anonim Dinləyici Çatını başlatmaq  üçün
                                <p>
                                    “Müraciət et” düyməsinə klikləyin.
                                </p>

                            </div>
                        </div>
                        <Link to="../poolrequest">
                            <button
                                className='w-[173px] dark:bg-blue100 bg-lightblue text-sm text-dark100 py-[11px] rounded-[10px]'>
                                Müraciət Et
                            </button>
                        </Link>
                    </div>
                )}
            </div>
    )
}

export default Chat

