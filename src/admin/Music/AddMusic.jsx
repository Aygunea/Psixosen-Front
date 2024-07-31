import React, { useRef, useState } from 'react';
import { FiDownload } from "react-icons/fi";

const AddMusic = () => {
    const artistRef = useRef(null);
    const titleRef = useRef(null);
    const durationRef = useRef(null);
    const coverImageRef = useRef(null);
    const audioRef = useRef(null);

    const [coverImageName, setCoverImageName] = useState('');
    const [audioFileName, setAudioFileName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('artist', artistRef.current.value);
        formData.append('duration', durationRef.current.value);
        formData.append('coverImage', coverImageRef.current.files[0]);
        formData.append('musicFile', audioRef.current.files[0]);

        try {
            const response = await fetch('http://localhost:3000/api/music', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                titleRef.current.value = ''
                artistRef.current.value = ''
                durationRef.current.value = ''
                coverImageRef.current.value = null
                audioRef.current.value = null
                setCoverImageName('');
                setAudioFileName(''); 
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

    const handleAudioChange = () => {
        setAudioFileName(audioRef.current.files[0]?.name || '');
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
                {/*  Musiqi artisti */}
                <div className='flex flex-col gap-3'>
                    <label htmlFor="artist" className='text-gray10 text-base xs:text-sm'>
                        Musiqi artisti:
                    </label>
                    <input id="artist" type="text" placeholder='Musiqinin artisti'
                        ref={artistRef}
                        className="w-full h-[60px] xs:h-[42px] xs:text-xs text-sm xs:px-4 px-6 outline-none placeholder:text-light70 bg-lightgray text-light70 rounded-[10px] xs:rounded-[5px]"
                    />
                </div>
                {/*  Musiqi adı */}
                <div className='flex flex-col gap-3'>
                    <label htmlFor="title" className='text-gray10 text-base xs:text-sm'>
                        Musiqi adı:
                    </label>
                    <input id="title" type="text" placeholder='Musiqinin Adı'
                        ref={titleRef}
                        className="w-full h-[60px] xs:h-[42px] xs:text-xs text-sm xs:px-4 px-6 outline-none placeholder:text-light70 bg-lightgray text-light70 rounded-[10px] xs:rounded-[5px]"
                    />
                </div>
                {/*  Musiqi müddəti */}
                <div className='flex flex-col gap-3'>
                    <label htmlFor="duration" className='text-gray10 text-base xs:text-sm'>
                        Musiqi müddəti:
                    </label>
                    <input id="duration" type="text" placeholder='Musiqinin Müddəti'
                        ref={durationRef}
                        className="w-full h-[60px] xs:h-[42px] xs:text-xs text-sm xs:px-4 px-6 outline-none placeholder:text-light70 bg-lightgray text-light70 rounded-[10px] xs:rounded-[5px]"
                    />
                </div>
                {/* Mp3 yüklə */}
                <div className="relative flex flex-col gap-3">
                    <label htmlFor="audio" className='text-gray10 text-base xs:text-sm'>
                        Mp3 yüklə:
                    </label>
                    <input
                        ref={audioRef}
                        type="file"
                        name="audio"
                        className="absolute w-full h-full opacity-0 outline-none"
                        onChange={handleAudioChange}
                    />
                    <div className="px-6 flex items-center justify-between w-full bg-lightgray text-light70 rounded-[10px] h-[60px]">
                        {audioFileName || 'Fayl yüklə'}
                        <FiDownload className='text-light70 w-4 h-4' />
                    </div>
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

export default AddMusic;
