import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";
import Invoice from './Invoice';

const Finance = () => {
  const [activeButton, setActiveButton] = useState('existing');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className='flex items-center py-8 xs:py-0'>
        <p className='dark:text-dark100 text-gray10 font-medium text-2xl xs:text-lg mr-9'>
          Balans:
        </p>
        <div className='py-[10px] w-[100px] rounded-[10px] xs:rounded-[5px] bg-lightblue dark:bg-blue100 text-dark100 text-sm text-center mr-9 xs:mr-6'>
          149 AZN
        </div>
        <div className='py-[10px] w-[100px] rounded-[10px] xs:rounded-[5px] bg-lightgreen dark:bg-green text-dark100 text-sm text-center'>
          Artır
        </div>
      </div>

      <div className='border-b dark:border-dark20 border-light20 py-6'>
        <p className="dark:text-dark100 text-gray10 text-lg xs:text-base font-medium mb-2 xs:mb-1">
          Ödəniş üsulu
        </p>
        <p className='text-light50 dark:text-dark50 text-base xs:text-sm'>
          Faktura məlumatlarınızı və ünvanınızı yeniləyin.
        </p>
      </div>

      {/* Kart detallari */}
      <div className='border-b dark:border-dark20 border-light20 flex gap-[110px] xs:gap-8 xs:flex-col mt-5'>
        {/* left */}
        <div className='py-3'>
        <p className="dark:text-dark100 text-gray10 text-lg xs:text-base font-medium mb-2 xs:mb-1">
            Kart Detalları
          </p>
          <p className='text-light50 dark:text-dark50 text-base xs:text-sm mb-8'>
            Faktura məlumatlarınızı və ünvanınızı yeniləyin.
          </p>
          <button className='text-light70 dark:text-dark70 text-base flex items-center gap-3 p-3 rounded-[5px] bg-light200 dark:bg-dark300'>
            <FaPlus />
            Başqa kart əlavə edin
          </button>
        </div>
        {/* right */}
        <div className='py-3 flex gap-[100px] xs:gap-16 mb-14 xs:mb-4'>
          <div className="flex flex-col gap-8">
            <div>
              <p className='text-light70 dark:text-dark70 text-base xs:text-sm mb-2'>
                Kartın adı
              </p>
              <input
                placeholder='İntiqam Memmedov'
                className='dark:text-dark100 text-gray10 text-base xs:text-xs placeholder:dark:text-dark100 placeholder:text-gray10 flex items-center gap-3 p-3 rounded-[10px] xs:rounded-[4px] bg-light200 dark:bg-dark300 w-[286px] xs:w-[186px] outline-none' />
            </div>
            <div>
              <p className='text-light70 dark:text-dark70 text-base xs:text-sm mb-2'>
                Kartın nömrəsi
              </p>
              <div className="relative">
                <input
                  placeholder=' 8269 9620 9292 2538'
                  className='dark:text-dark100 text-gray10 text-base xs:text-xs placeholder:dark:text-dark100 placeholder:text-gray10 flex items-center gap-3 p-3 pl-[66px] xs:pl-[52px] rounded-[10px] xs:rounded-[4px] bg-light200 dark:bg-dark300 w-[286px] xs:w-[186px] outline-none' />
                <img
                  className='w-[42px] xs:w-7 absolute left-3 top-1/2 -translate-y-1/2'
                  src={require('../../images/MasterCard.png')} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p className='text-light70 dark:text-dark70 text-base xs:text-sm mb-2'>
                İstifadə müddəti
              </p>
              <input
                placeholder='02 / 2028'
                className='dark:text-dark100 text-gray10 text-base xs:text-xs placeholder:dark:text-dark100 placeholder:text-gray10 flex items-center gap-3 p-3 rounded-[10px] xs:rounded-[4px] bg-light200 dark:bg-dark300 w-[198px] xs:w-[102px] outline-none' />
            </div>
            <div>
              <p className='text-light70 dark:text-dark70 text-base xs:text-sm mb-2'>
                CVV
              </p>
              <input
                placeholder='* * *'
                className='dark:text-dark100 text-gray10 text-base xs:text-xs placeholder:dark:text-dark100 placeholder:text-gray10 flex items-center gap-3 p-3 rounded-[10px] xs:rounded-[4px] bg-light200 dark:bg-dark300 w-[198px] xs:w-[102px] outline-none' />
            </div>
          </div>
        </div>
      </div>
      {/* Əlaqə e-poçtu  */}
      <div className='border-b dark:border-dark20 border-light20 flex xs:flex-col xs:gap-6 gap-[110px] pt-6 pb-12 xs:pt-8 xs:pb-4'>
        <div>
          <p className="dark:text-dark100 text-gray10 text-lg xs:text-base font-medium mb-2">
            Əlaqə E-poçtu
          </p>
          <p className='text-light50 dark:text-dark50 text-base'>
            Faktura məlumatlarınızı və ünvanınızı yeniləyin.
          </p>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-6'>
            <button
              className={`rounded-full border-[2px] h-6 w-6 xs:w-4 xs:h-4 flex items-center justify-center ${activeButton === 'existing' ? 'border-blue100 dark:border-blue50' : 'border-light50 dark:border-dark50'}`}
              onClick={() => handleButtonClick('existing')}
            >
              {activeButton === 'existing' && <div className='w-[10px] h-[10px] xs:w-2 xs:h-2 rounded-full bg-blue100 dark:bg-blue50'></div>}
            </button>
            <div>
              <p className='dark:text-dark100 text-gray10 text-base'>Mövcud e-poçta göndərin</p>
              <p className='text-light50 dark:text-dark50 text-sm'>intiqamemmedov@gmail.com</p>
            </div>
          </div>

          <div className='flex items-center gap-6'>
            <button
              className={`rounded-full border-[2px] h-6 w-6 xs:w-4 xs:h-4 flex items-center justify-center ${activeButton === 'new' ? 'border-blue100 dark:border-blue50' : 'border-light50 dark:border-dark50'}`}
              onClick={() => handleButtonClick('new')}
            >
              {activeButton === 'new' && <div className='w-[10px] h-[10px] xs:w-2 xs:h-2 rounded-full bg-blue100 dark:bg-blue50'></div>}
            </button>
            <p className='text-gray10 dark:text-dark100 text-base'>Başqa e-poçt ünvanı əlavə edin</p>
          </div>
        </div>
      </div>
      {/* Ödənişlərin tarixçəsi  */}
        <div className="flex flex-col py-3 mt-6">
          <div className="dark:text-dark100 text-gray10 text-lg font-medium flex items-center gap-3">
            Ödənişlərin tarixçəsi
            <CiSaveDown2 className="w-5" />
          </div>
          <div className='text-light50 dark:text-dark50 text-base'>
            Etdiyiniz əməliyyata baxın
          </div>
        </div>
        <Invoice />

    </div>
  )
}

export default Finance
