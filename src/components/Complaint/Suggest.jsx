import React, { useRef, useState } from 'react';
import axios from 'axios';
import Popup from '../Popup/Popup';

const Suggest = () => {
  const descriptionRef = useRef();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = descriptionRef.current.value;

    try {
      const response = await axios.post('http://localhost:3000/api/suggest', { description });

      console.log('Suggestion submitted:', response.data);
      descriptionRef.current.value = '';
      setPopupType('success');
      setPopupVisible(true);
    } catch (error) {
      console.error('Error:', error);
      setPopupType('failed');
      setPopupVisible(true);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <form className='w-[536px] xs:w-[382px] flex flex-col gap-9' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
          <label htmlFor="text" className='text-gray10 dark:text-dark100 text-base xs:tex-sm'>
            Təklifinizi ətraflı qeyd edin
          </label>
          <textarea
            ref={descriptionRef}
            id="text"
            placeholder='Qeydləri daxil edin...'
            className="w-full placeholder-light70 h-[156px] text-sm py-4 px-6 outline-none dark:bg-dark300 bg-lightgray text-dark70 rounded-[10px]"
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
      {popupVisible && <Popup
        message={popupType === 'success' ? "Sizin təklifiniz uğurla göndərildi!" :
          "Təklifiniz uğursuz oldu. Zəhmət olmasa yenidən cəhd edin və ya dəstək xidmətimizlə əlaqə saxlayın."}
        type={popupType}
        onClose={closePopup} />}
    </>
  );
};

export default Suggest;

