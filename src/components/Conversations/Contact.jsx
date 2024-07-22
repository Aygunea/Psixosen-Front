import React, { useEffect, useRef, useState } from 'react';
import SingleContact from './SingleContact';
import SingleGroup from './SingleGroup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts } from '../../slices/contacts.slice';
import { setselectedConversation } from '../../slices/conversations.slice';
import { CiSearch } from "react-icons/ci";

const Contact = ({ activeTab }) => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.contacts);
    const role = useSelector(state => state.role.role);
    const searchInputRef = useRef(null);
    // const [filteredContacts, setFilteredContacts] = useState([]);
    // const allMessages = useSelector((state) => state.conversation.allMessages);

    const getContacts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/contacts`);
            dispatch(setContacts(response.data));
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };
    useEffect(() => {
        getContacts();
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(fetchMessages());
    // }, [dispatch]);

    // useEffect(() => {
    //     setFilteredContacts(contacts);
    // }, [contacts]);

    const handleContactClick = (contact) => {
        dispatch(setselectedConversation(contact));
    };

    const handleSearchChange = () => {
        // const searchTerm = searchInputRef.current?.value.toLowerCase();

        // const filtered = contacts.filter(contact => {
        //     const contactName = role === 'user' ? contact.contact.nickname.toLowerCase() :
        //         contact.contact.username.toLowerCase();
        //     return contactName.includes(searchTerm);
        // });

        // const filteredMessages = allMessages.filter(message => {
        //     return message.message.toLowerCase().includes(searchTerm);
        // });

        // console.log('Filtered Contacts:', filtered.map(contact => role === 'user' ? contact.contact.nickname : contact.contact.username));
        // console.log('Filtered Messages:', filteredMessages.map(message => message.message));

        // setFilteredContacts(filtered);
    };

    return (
        <div className='relative h-full'>
            <div className='h-full p-6 xs:border-none border-r dark:border-dark20 border-light20 sm:bg-lightwhite
         sm:dark:bg-darkblack rounded-tl-[10px] rounded-bl-[10px] overflow-y-auto'>
                <div className='relative'>
                    <CiSearch className='rotate-90 dark:text-dark70 text-light50 w-4 h-4 absolute top-1/2 -translate-y-1/2 left-4' />
                    <input
                        ref={searchInputRef}
                        className='placeholder:text-light50 placeholder:dark:text-dark70 w-full pl-[44px] text-xs py-[10px] rounded-[52px] bg-lightgray text-light50 dark:bg-dark300 dark:text-dark50 outline-none'
                        placeholder='Axtarın və ya yeni söhbətə başlayın..'
                        type="text"
                        onChange={handleSearchChange}
                    />
                </div>
                <div className='flex flex-col py-9'>
                    {activeTab === 'Söhbətlər' ? (
                        <>
                            {contacts.map((contact, index) => {
                                return (
                                    <SingleContact
                                        key={index}
                                        contact={contact.contact}
                                        lastMessage={contact.lastMessage}
                                        onClick={() => handleContactClick(contact.contact)}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <>
                            <SingleGroup />
                            <SingleGroup />
                            <SingleGroup />
                            <SingleGroup />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;


