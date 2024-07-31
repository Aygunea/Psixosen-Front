import React, { useEffect, useRef, useState } from 'react';
import SingleContact from './SingleContact';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts } from '../../slices/contacts.slice';
import { setselectedConversation } from '../../slices/conversations.slice';

const Contact = ({ onContactSelect  }) => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.contacts);
    const getContacts = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/contacts`);
            const data = await response.json()
            dispatch(setContacts(data));
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };
    useEffect(() => {
        getContacts();
    }, [dispatch]);

    const handleContactClick = (contact) => {
        dispatch(setselectedConversation(contact));
        if (onContactSelect) {
          onContactSelect(contact); 
        }
      };

    return (
        <div className='relative h-full lg:bg-lightwhite lg:dark:bg-darkblack border-r dark:border-dark20 border-light20 overflow-y-auto'>
        <div className='p-6'>
          <div className='flex flex-col'>
            {contacts.map((contact, index) => (
              <SingleContact
                key={index}
                contact={contact.contact}
                lastMessage={contact.lastMessage}
                onClick={() => handleContactClick(contact.contact)}
              />
            ))}
          </div>
        </div>
      </div>
         
      );
    };

export default Contact;



