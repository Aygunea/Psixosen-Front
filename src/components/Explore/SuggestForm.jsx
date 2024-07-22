import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Popup from '../Popup/Popup';

const SuggestForm = () => {
  //popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState('');

  const detailsRef = useRef()
  const listener = useSelector(state => state.listener.listener)
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { duration: 15, price: 15 },
    { duration: 30, price: 20 },
    { duration: 60, price: 30 },
    { duration: 90, price: 40 },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // console.log(selectedOption);
  };
  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelectTopic = (topic) => {
    setTopic(topic);
    setIsOpen(false);
  };
  const daysOfWeek = [
    "Bazar ertəsi",
    "Çərşənbə axşamı",
    "Çərşənbə",
    "Cümə axşamı",
    "Cümə",
    "Şənbə",
    "Bazar"
  ];
  // Fonksiyon bugünden başlayarak 1 hafta boyunca tarihleri hesaplar
  const getWeeklyDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };
  // Tarihleri ve günleri alarak düzenleyen fonksiyon
  const formatDay = (date) => {
    const formattedDay = `${date.getDate()} ${getMonthName(date.getMonth())}`;
    return formattedDay;
  };
  const formatDate = (date) => {
    const day = daysOfWeek[date.getDay()];
    const formattedDate = `${day}`;
    return formattedDate;
  };

  // Ay ismini döndüren yardımcı fonksiyon
  const getMonthName = (monthIndex) => {
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "İyun",
      "İyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr"
    ];
    return months[monthIndex];
  };

  const dates = getWeeklyDates();
  const today = new Date();
  // saat secimi
  const generateTimeSlots = () => {
    const timeSlots = [];
    const startTime = 9; // Seher 9-da baslayir
    const endTime = 24; // Aksam 00:00-da sona catir
    const slotDuration = 0.5; // Slot araligi yarim saat (30 deqiqe)

    let currentTime = startTime;
    while (currentTime < endTime) {
      const hours = Math.floor(currentTime);
      const minutes = (currentTime - hours) * 60;
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      timeSlots.push(time);
      currentTime += slotDuration;
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const requestData = {
  //     topic: topic,
  //     duration: selectedOption?.duration,
  //     details: detailsRef.current?.value,
  //     price: selectedOption?.price,
  //     sessionStartTime: selectedDate?.toISOString(), // Format as ISO string
  //   };
  //   console.log(requestData);
  //   try {
  //     const response = await axios.post(`http://localhost:3000/api/sessions/suggest/${listener._id}`, requestData);
  //     console.log('Submitted Data:', response.data);
  //     setPopupType('success');
  //     setPopupVisible(true);
  //   } catch (error) {
  //     console.error('Error submitting request:', error);
  //     setPopupType('failed');
  //     setPopupVisible(true);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Burada bütün seçilmiş məlumatları yoxlayın
    if (!topic || !selectedDate || !selectedTime || !selectedOption) {
      setPopupType('failed');
      setPopupVisible(true);
      return;
    }

    // Seçilmiş tarix və saatı birləşdirin
    const [hours, minutes] = selectedTime.split(':');
    const sessionStartTime = new Date(selectedDate);
    sessionStartTime.setHours(hours);
    sessionStartTime.setMinutes(minutes);

    const requestData = {
      topic,
      duration: selectedOption.duration,
      details: detailsRef.current.value,
      price: selectedOption.price,
      sessionStartTime: sessionStartTime.toISOString(), // Format as ISO string
    };

    try {
      const response = await axios.post(`http://localhost:3000/api/sessions/suggest/${listener._id}`, requestData);
      console.log('Submitted Data:', response.data);
      // setPopupType('success');
      // setPopupVisible(true);
    } catch (error) {
      console.error('Error submitting request:', error);
      // setPopupType('failed');
      // setPopupVisible(true);
    }
  };


  const closePopup = () => {
    setPopupVisible(false);
  };
  useEffect(() => {
    console.log((selectedDate && selectedDate.toDateString()) + "selected");

  }, [selectedDate])
  useEffect(() => {
    dates.map(date => {
      console.log(date.toDateString());
    })

  }, [dates])
  return (
    <>
      <form className='flex flex-col gap-9 xs:gap-8' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 w-[536px] xs:w-full">
          <label htmlFor="username" className='text-gray10 dark:text-dark100 text-base xs:text-sm'>
            Dinləyici adı
          </label>

          <div className="flex items-center w-max h-[54px] xs:h-[42px] placeholder:text-light70 dark:placeholder:text-dark70 text-lg xs:text-sm px-[60px] outline-none dark:bg-dark300 bg-lightgray dark:text-dark70 text-light70 rounded-[10px]">
            {listener?.nickname}
          </div>
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
              className="w-full h-[60px] xs:h-[42px] placeholder:text-light70 dark:placeholder:text-dark70 xs:text-xs py-[10px] px-6 outline-none dark:bg-dark300 bg-lightgray dark:text-dark70 text-light70 rounded-[10px]"
            />
            <FaChevronDown className={`absolute top-1/2 xs:text-xs -translate-y-1/2 right-4 text-dark70 ${isOpen ? 'rotate-180' : ''}`} />
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

        {/* Tarix */}
        <div className="flex flex-col gap-4">
          <div className="text-gray10 dark:text-dark100 text-base xs:text-sm">Tarix :</div>
          <div className="gap-[18px] xs:gap-4 grid grid-cols-7 xs:grid-cols-[repeat(auto-fill,_110px)] grid-flow-col overflow-x-auto scrollbar-hide">
            {dates.map((date, index) => (
              <button
                onClick={() => setSelectedDate(date)}
                key={index}
                className={`py-[10px] xs:h-12 xs:min-w-[110px] dark:bg-dark300 bg-lightgray rounded-[10px]
    ${selectedDate && selectedDate.toDateString() == date.toDateString() ? 'bg-blue100 text-dark100' : 'bg-lightgray dark:bg-dark300'}`}
              >
                {date.getDate() === today.getDate() ? (
                  <>
                    <p className="dark:text-dark70 text-light70 text-xs">Bugün</p>
                    <p className="dark:text-dark100 text-gray10 text-sm xs:text-xs">{formatDay(date)}</p>
                  </>
                ) : (
                  <>
                    <p className="dark:text-dark70 text-light70 text-xs">{formatDate(date)}</p>
                    <p className="dark:text-dark100 text-gray10 text-sm xs:text-xs">{formatDay(date)}</p>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="flex flex-col gap-4">
          <div className="text-gray10 dark:text-dark100 text-base xs:text-sm">Saat seçin:</div>
          <div className="grid grid-cols-8 xs:grid-cols-4 gap-4 xs:gap-3">
            {timeSlots.map((time, index) => (
              <button
                onClick={() => setSelectedTime(time)}
                className={`rounded-[5px] py-4 xs:py-[10px] text-xs text-dark100 ${selectedTime === time ? 'bg-blue100 text-dark100' : 'bg-lightgray dark:bg-dark300'}`}

                key={index}
              >
                {time}
              </button>
            ))}
          </div>
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
      {/* {
        popupVisible && <Popup
          message={popupType === 'success' ? "Sizin təklifiniz uğurla göndərildi!" :
            "Təklifiniz uğursuz oldu. Zəhmət olmasa yenidən cəhd edin və ya dəstək xidmətimizlə əlaqə saxlayın."}
          type={popupType}
          onClose={closePopup} />
      } */}
    </>
  );
}

export default SuggestForm;
