import React from 'react'
import SendMessage from './SendMessage'
import Messages from '../Chat/Messages'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Chat = () => {
    const selectedConversation = useSelector(state => state.conversation?.selectedConversation);
    const role = useSelector(state => state.role.role)


    return (
        <div className='flex flex-col overflow-y-auto relative w-full h-full p-6 pr-0 lg:bg-lightwhite lg:dark:bg-darkblack rounded-tr-[10px] rounded-br-[10px] '>
            {selectedConversation ? (
                <>
                    <div className="flex-grow overflow-y-auto scrollbar pr-6">
                        <Messages />
                    </div>
                    <SendMessage />
                </>
            ) : (
                role === 'user' && (
                    <div className='xs:hidden sm:flex gap-6 flex-col h-full justify-center items-center text-center py-[17px]'>
                        <div className='w-[80%]'>
                            <p className='dark:text-dark100 text-gray10 xl:text-4xl lg:text-3xl md:text-3xl text-xl mb-3'>Anonim Dinləyici Çatı</p>
                            <div className='dark:text-dark70 text-light70 mb-4 xl:text-base lg:text-sm md:text-base'>
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
                )

            )}
        </div>
    )
}

export default Chat

