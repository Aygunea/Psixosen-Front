import React, { useRef, useState } from 'react'
import { FaChevronDown } from "react-icons/fa6";
import axios from 'axios'
import { useSelector } from 'react-redux';
import Popup from '../Popup/Popup';

const Complaint = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState('');

  const titleRef = useRef(null);
  const complainedAboutUsernameRef = useRef(null);
  const descriptionRef = useRef(null);
  const titles = [
    'Şəxsi məlumatlarını təqdim edir',
    'Şəxsi məlumat tələb edir',
    'Nömrə istəyir',
    'Qeyri-etik / vulqar ifadə işlədir',
    'Hədə-qorxu gəlir',
    'Dostluq və ya yaxınlıq təklif edir'
  ]

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    setSelectedValue(category);
    setIsOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaintData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      complainedAboutUsername: complainedAboutUsernameRef.current.value
    };

    try {
      const response = await axios.post('http://localhost:3000/api/complaints', complaintData);
      titleRef.current.value = '';
      complainedAboutUsernameRef.current.value = '';
      descriptionRef.current.value = '';
      setPopupType('success');
      setPopupVisible(true);
      console.log('Complaint submitted successfully:', response.data);
    } catch (error) {
      setPopupType('failed');
      setPopupVisible(true);
      console.error('Error submitting complaint:', error);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <form className='w-[536px] xs:w-[382px] flex flex-col gap-9 xs:gap-8' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label htmlFor="title" className='text-gray10 dark:text-dark100 text-base xs:tex-sm'>
            Şikayətin başlığı:
          </label>
          <div className="relative">
            <input
              id="title"
              type="text"
              placeholder="Şikayətin Başlığı"
              onClick={handleToggle}
              value={selectedValue}
              readOnly
              ref={titleRef}
              className="w-full h-[60px] xs:h-[42px] xs:text-xs placeholder-light70 text-sm xs:px-4 px-6 outline-none dark:bg-dark300 bg-lightgray dark:text-dark70 text-light70 rounded-[10px] xs:rounded-[5px]"
            />
            <FaChevronDown className={`absolute top-1/2 -translate-y-1/2 right-4 xs:text-xs text-dark70 ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          {isOpen && (
            <ul className="mt-3 xs:mt-0 text-light70 dark:text-dark70 dark:bg-dark300 bg-dark100 text-base xs:text-xs rounded-[10px] xs:rounded-[5px]">
              {titles.map((category, index) => (
                <li key={index}
                  onClick={() => handleSelect(category)}
                  className={`px-6 xs:px-4 py-3 cursor-pointer border-light20 dark:border-dark20 ${index !== titles.length - 1 ? 'border-b' : ''}`}>
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Şikayət olunan */}
        <div className='flex flex-col gap-4'>
          <label htmlFor="name" className='text-gray10 dark:text-dark100 text-base xs:tex-sm'>
            Şikayət edilən istifadəçinin adı:
          </label>
          <input id="name" type="text" placeholder='Ləqəb'
            ref={complainedAboutUsernameRef}
            className="w-full h-[60px] xs:h-[42px] xs:text-xs text-sm xs:px-4 px-6 outline-none placeholder-light70 dark:bg-dark300 bg-lightgray text-dark70 rounded-[10px] xs:rounded-[5px]"
          />
        </div>
        {/* Daha Ətraflı */}
        <div className='flex flex-col gap-4'>
          <label htmlFor="text" className='text-gray10 dark:text-dark100 text-base xs:tex-sm'>
            Şikayətinizi daha ətraflı qeyd edin
          </label>
          <textarea id="text" type="text" placeholder='Qeydləri daxil edin...'
            ref={descriptionRef}
            className="w-full placeholder-light70 h-[156px] xs:h-[140px] xs:text-xs text-sm py-4 xs:px-4 px-6 outline-none dark:bg-dark300 bg-lightgray text-dark70 rounded-[10px] xs:rounded-[5px]"
          ></textarea>
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
      {/* popup */}
      {
        popupVisible && <Popup
          message={popupType === 'success' ? "Sizin şikayətiniz uğurla göndərildi!" :
            "Şikayətiniz uğursuz oldu. Zəhmət olmasa yenidən cəhd edin və ya dəstək xidmətimizlə əlaqə saxlayın."}
          type={popupType}
          onClose={closePopup} />
      }
    </>
  ) 
}

export default Complaint
