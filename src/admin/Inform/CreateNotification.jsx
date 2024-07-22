import React, { useRef, useState } from 'react'

const CreateNotification = () => {
  const [activeButton, setActiveButton] = useState('Bütün istifadəçilər');
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = titleRef.current.value;
    const message = descriptionRef.current.value;

    let recipient = {};
    if (activeButton === 'Bütün istifadəçilər') {
      recipient = { sendToAll: true };
    } else if (activeButton === 'Bütün Danışanlar') {
      recipient = { sendToAllUsers: true };

    } else if (activeButton === 'Bütün Dinləyicilər') {
      recipient = { sendToAllListeners: true };
    }

    try {
      const response = await fetch('http://localhost:3000/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          recipient
        }),
      });
      const data = await response.json();
      console.log('Notification sent:', data);
      titleRef.current.value = '';
      descriptionRef.current.value = '';
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div>
      <div className='flex gap-4 pb-8'>
        {['Bütün istifadəçilər', 'Bütün Danışanlar', 'Bütün Dinləyicilər'].map(buttonName => (
          <button
            key={buttonName}
            onClick={() => handleClick(buttonName)}
            className={`w-[150px] text-sm p-[10px] rounded-[22px] text-light70 
            ${activeButton === buttonName ? 'bg-light20  text-gray10 opacity-100' : 'bg-transparent text-light70'}`}
          >
            {buttonName}
          </button>
        ))}
      </div>
      <form className='w-[536px]' onSubmit={handleSubmit}>
        {/* Bildiriş başlığı */}
        <div className='flex flex-col gap-4 mb-14'>
          <label htmlFor="title" className='text-gray10 text-base xs:tex-sm'>
            Bildiriş başlığı:
          </label>
          <input id="title" type="text" placeholder='Endirim'
            ref={titleRef}
            className="w-full h-[60px] xs:h-[42px] xs:text-xs text-sm xs:px-4 px-6 outline-none placeholder-light70 bg-lightgray text-light70 rounded-[10px] xs:rounded-[5px]"
          />
        </div>
        {/* Bildiriş mətni */}
        <div className='flex flex-col gap-4 mb-20'>
          <label htmlFor="text" className='text-gray10 text-base xs:tex-sm'>
            Şikayətinizi daha ətraflı qeyd edin
          </label>
          <textarea id="text" type="text" placeholder='Bildiriş mətnini daxil edin...'
            ref={descriptionRef}
            className="w-full placeholder-light70 h-[156px] xs:h-[140px] xs:text-xs text-sm py-4 xs:px-4 px-6 outline-none bg-lightgray text-light70 rounded-[10px] xs:rounded-[5px]"
          ></textarea>
        </div>
        <div className="flex gap-8">
          <button
            type="submit"
            className='border-[3px] border-lightgreen text-lightgreen p-[18px] xs:py-[9px] text-base w-full font-medium rounded-[10px] xs:rounded-[5px]'>
            Ləğv Et
          </button>
          <button
            type="submit"
            className='bg-lightgreen text-dark100 p-[18px] xs:py-[9px] text-base w-full font-medium rounded-[10px] xs:rounded-[5px]'>
            Göndər
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNotification
