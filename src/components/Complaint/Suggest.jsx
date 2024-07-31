import React, { useRef, useState } from 'react';
import Popup from '../Popup/Popup';

const Suggest = () => {
  const descriptionRef = useRef();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = descriptionRef.current.value;

    try {
      const response = await fetch('http://localhost:3000/api/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({description}),
      });
      const data = await response.json();
      if(response.ok){
        setPopupType('success');
        setPopupVisible(true);
        setPopupMessage("Sizin təklifiniz uğurla göndərildi!")
      }
      if(!response.ok){
        setPopupType('failed');
        setPopupVisible(true);
        setPopupMessage(data.message)
      }
      descriptionRef.current.value = '';
    } catch (error) {
      console.error('Error:', error);
      setPopupType('failed');
      setPopupVisible(true);
      setPopupMessage("Server xətası")
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <form className='md:w-[536px] w-full flex flex-col lg:gap-9 gap-8' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
          <label htmlFor="text" className='text-gray10 dark:text-dark100 text-base xs:tex-sm'>
            Təklifinizi ətraflı qeyd edin
          </label>
          <textarea
            ref={descriptionRef}
            id="text"
            placeholder='Qeydləri daxil edin...'
            className="w-full dark:placeholder:text-dark70 placeholder:text-light70 h-[156px] text-sm py-4 px-6 outline-none dark:bg-dark300 bg-lightgray dark:text-dark70 text-light70 rounded-[10px]"
          ></textarea>
        </div>
        <div className="flex gap-9 xs:gap-4 w-[536px] xs:w-full xs:py-4">
          <button type="button" className='dark:text-green text-lightgreen dark:border-green border-lightgreen border-[3px] w-full py-4 xs:py-[9px] text-base xs:text-sm rounded-[10px]'>
            Ləğv Et
          </button>
          <button type="submit" className='dark:bg-green bg-lightgreen text-dark100 rounded-[10px] py-4 xs:py-[9px] text-base xs:text-sm w-full '>
            Göndər
          </button>
        </div>
      </form>
      {/* popup */}
      {popupVisible && <Popup
        message={popupMessage}
        type={popupType}
        onClose={closePopup} />}
    </>
  );
};

export default Suggest;

