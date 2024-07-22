import React, { useRef, useState } from 'react';
import { FiDownload } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";

const AddPlaylist = () => {
  const titleRef = useRef(null);
  const nameRef = useRef(null);

  const coverImageRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const titles = [
    'Şəxsi məlumatlarını təqdim edir',
    'Şəxsi məlumat tələb edir',
    'Nömrə istəyir',
    'Qeyri-etik / vulqar ifadə işlədir',
    'Hədə-qorxu gəlir',
    'Dostluq və ya yaxınlıq təklif edir'
  ]
  const [coverImageName, setCoverImageName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', titleRef.current.value);

    try {
      const response = await fetch('http://localhost:3000/api/music', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Music added successfully:', result);
      } else {
        console.error('Error adding music:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCoverImageChange = () => {
    setCoverImageName(coverImageRef.current.files[0]?.name || '');
  };
  const handleSelect = (category) => {
    setSelectedValue(category);
    setIsOpen(false);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='p-8'>
      <form className='w-[536px] flex flex-col gap-8' onSubmit={handleSubmit}>
        {/* Qapaq şəkli */}
        <div className="relative flex flex-col gap-3">
          <label htmlFor="coverImage" className='text-gray10 text-base xs:text-sm'>
            Qapaq şəkli:
          </label>
          <input
            ref={coverImageRef}
            type="file"
            name="coverImage"
            className="absolute w-full h-full opacity-0 outline-none"
            onChange={handleCoverImageChange}
          />
          <div className="px-6 flex items-center justify-between w-full bg-lightgray text-light70 rounded-[10px] h-[60px]">
            {coverImageName || 'Qapaq şəkli yüklə'}
            <FiDownload className='text-light70 w-4 h-4' />
          </div>
        </div>
        {/*  Playlist Adıi */}
        <div className='flex flex-col gap-3'>
          <label htmlFor="artist" className='text-gray10 text-base xs:text-sm'>
            Playlist Adı:
          </label>
          <input id="name" type="text" placeholder='Playlist Adı'
            ref={nameRef}
            className="w-full h-[60px] xs:h-[42px] xs:text-xs text-sm xs:px-4 px-6 outline-none placeholder:text-light70 bg-lightgray text-light70 rounded-[10px] xs:rounded-[5px]"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="title" className='text-gray10 text-base xs:tex-sm'>
            Musiqi Başlığı:
          </label>
          <div className="relative">
            <input
              id="title"
              type="text"
              placeholder="Musiqinin Başlığı"
              onClick={handleToggle}
              value={selectedValue}
              readOnly
              ref={titleRef}
              className="w-full h-[60px] xs:h-[42px] xs:text-xs placeholder-light70 text-sm xs:px-4 px-6 outline-none bg-lightgray text-light70 rounded-[10px] xs:rounded-[5px]"
            />
            <FaChevronDown className={`absolute top-1/2 -translate-y-1/2 right-4 xs:text-xs text-dark70 ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          {isOpen && (
            <ul className="mt-3 xs:mt-0 text-light70 bg-dark100 text-base xs:text-xs rounded-[10px] xs:rounded-[5px]">
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

        <button
          type="submit"
          className='bg-lightgreen text-dark100 text-lg w-[268px] h-[60px] font-medium rounded-[10px] xs:rounded-[5px]'>
          Əlavə et
        </button>
      </form>
    </div>
  );
};

export default AddPlaylist;
