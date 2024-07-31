import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronDown } from 'react-icons/fa';
import Popup from '../Popup/Popup';
import { useNavigate } from 'react-router-dom';

const PoolRequestForm = () => {
  const detailsRef = useRef()
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  //popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate()

  const closePopup = () => {
    setPopupVisible(false);
    navigate('../explore')
  };

  const options = [
    { duration: 15, price: 15 },
    { duration: 30, price: 20 },
    { duration: 60, price: 30 },
    { duration: 90, price: 40 },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelectTopic = (topic) => {
    setTopic(topic);
    setIsOpen(false);
  };

  const titles = [
    "Sevgi münasibəti",
    "Ailə münasibəti",
    "Ailə və uşaq münasibəti",
    "Evlilik",
    "Boşanma",
    "Psixoloji narahatlıq",
    "Qorxu",
    "Koçinq",
    "Karyera"
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      topic: topic,
      duration: selectedOption?.duration,
      details: detailsRef.current?.value,
      price: selectedOption?.price,
    };
    try {
      const response = await fetch('http://localhost:3000/api/sessions/poolrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok) {
        setPopupType('success');
        setPopupMessage(data.message);
        setPopupVisible(true);
      } else {
        setPopupType('failed');
        setPopupMessage(data.message);
        setPopupVisible(true);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <>
      <form className='flex flex-col gap-9 xs:gap-8' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 w-[536px] xs:w-full">
          <label htmlFor="title" className='text-gray10 dark:text-dark100 text-base xs:text-sm'>
            Müraciət Mövzusu:
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Müraciət Mövzusu:"
              onClick={handleToggle}
              value={topic}
              readOnly
              className="w-full h-[60px] xs:h-[42px] placeholder:text-light70 dark:placeholder:text-dark70 text-sm xs:text-xs py-[10px] px-6 outline-none dark:bg-dark300 bg-lightgray dark:text-dark70 text-light70 rounded-[10px]"
            />
            <FaChevronDown className={`absolute xs:text-xs top-1/2 -translate-y-1/2 right-4 text-dark70 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          {isOpen && (
            <ul className="mt-3 xs:mt-2 text-light70 dark:text-dark70 dark:bg-dark300 bg-dark100 text-base xs:text-xs rounded-[10px]">
              {titles.map((topic, index) => (
                <li key={index} onClick={() => handleSelectTopic(topic)} className={`px-6 py-3 xs:py-[10px] cursor-pointer border-light20 dark:border-dark20 ${index !== titles.length - 1 ? 'border-b' : ''}`}>
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* duration */}
        <div className="flex flex-col gap-4 w-[536px] xs:w-full">
          <div className='text-gray10 dark:text-dark100 text-base xs:text-sm'>
            Müddət:
          </div>
          <div className="xs:w-full grid grid-cols-2 gap-y-6 gap-x-9 xs:gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                className={`py-5 xs:py-[13px] sm:w-[250px] text-light-70 dark:text-dark70 text-base xs:text-xs rounded-[10px] ${selectedOption && selectedOption.duration === option.duration && selectedOption.price === option.price
                  ? 'bg-blue100'
                  : 'dark:bg-dark300 bg-lightgray'
                  }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.duration} dəqiqə / {option.price} azn
              </button>
            ))}
          </div>
        </div>

        {/* Ətraflı Qeyd */}
        <div className='flex flex-col gap-4 w-[536px] xs:w-full'>
          <label htmlFor="details" className='text-gray10 dark:text-dark100 text-base xs:text-sm'>
            Ətraflı Qeyd:
          </label>
          <textarea
            ref={detailsRef}
            placeholder='Qeydləri daxil edin...'
            className="w-full placeholder:text-light70 dark:placeholder:text-dark70 h-[156px] xs:h-[140px] text-sm xs:text-xs py-4 px-6 xs:px-4 outline-none dark:bg-dark300 bg-lightgray text-dark70 rounded-[10px]"></textarea>
        </div>

        <div className="flex gap-9 xs:gap-4 w-[536px] xs:w-full xs:py-4">
          <button type="button" className='dark:text-green text-lightgreen dark:border-green border-lightgreen border-[3px] w-full py-4 xs:py-[9px] text-base xs:text-sm rounded-[10px]'>
            Ləğv Et
          </button>
          <button type="submit" className='dark:bg-green bg-lightgreen dark:text-dark100 rounded-[10px] py-4 xs:py-[9px] text-base xs:text-sm w-full '>
            Göndər
          </button>
        </div>
      </form>
      {
        popupVisible && <Popup
          message={popupMessage}
          type={popupType}
          onClose={closePopup} />
      }
    </>
  );
}

export default PoolRequestForm;
