// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaPause, FaPlay } from 'react-icons/fa';
// import { PiCaretLineRightFill, PiCaretLineLeftFill, PiRepeatBold } from 'react-icons/pi';
// import { GoHeart } from 'react-icons/go';
// import { play, pause, next, previous, repeat, setCurrentTime } from '../../slices/music.slice';

// const ActiveMusic = () => {
//   const dispatch = useDispatch();
//   const currentMusicIndex = useSelector(state => state.music.currentMusicIndex);
//   const musics = useSelector(state => state.music.musics);
//   const playing = useSelector(state => state.music.playing);
//   const duration = useSelector(state => state.music.duration);
//   const currentTime = useSelector(state => state.music.currentTime);

//   const handlePlayPause = () => {
//     if (playing) {
//       dispatch(pause());
//     } else {
//       dispatch(play());
//     }
//   };

//   const handleNext = () => {
//     dispatch(next());
//     console.log(currentMusicIndex);
//   };

//   const handlePrevious = () => {
//     dispatch(previous());
//     console.log(currentMusicIndex);

//   };

//   const handleRepeatClick = () => {
//     dispatch(repeat());
//   };

//   const handleProgressBarClick = event => {
//     const progressBar = event.currentTarget; 
//     const clickX = event.clientX - progressBar.getBoundingClientRect().left;
//     const newTime = (clickX / progressBar.offsetWidth) * duration;
//     dispatch(setCurrentTime(newTime));
//   };

//   const progress = duration ? (currentTime / duration) * 100 : 0;
//   const coverImageUrl = musics[currentMusicIndex]?.coverImage 
//   ? `http://localhost:3000/${musics[currentMusicIndex].coverImage}` 
//   : '';

//   if (!musics.length) return null;

//   return (
//     <div className=" flex w-full">
//       <div className="w-[94px] h-[105px] mr-6">
//         <img className="object-cover w-full h-full rounded-[7.5px]" src={coverImageUrl} alt="" />
//       </div>
//       <div className="flex flex-col gap-6 w-full">
//         <div className="flex items-center justify-between">
//           <div className="dark:text-dark50 text-light50 text-sm">
//             <GoHeart className="w-4 h-4" />
//           </div>
//           <div className="flex items-center gap-4 dark:text-dark50 text-dark70">
//             <PiCaretLineLeftFill onClick={handlePrevious} className="w-5 h-4 cursor-pointer" />
//             <div
//               onClick={handlePlayPause}
//               className="w-[42px] h-[42px] rounded-full flex items-center justify-center dark:bg-gray10 bg-lightgray shadow-custom cursor-pointer"
//             >
//               {playing ? <FaPause className="xs:text-xs" /> : <FaPlay className="xs:text-xs" />}
//             </div>
//             <PiCaretLineRightFill onClick={handleNext} className="w-5 h-4 cursor-pointer" />
//           </div>
//           <div className="dark:text-dark50 text-light50 text-sm">
//             <PiRepeatBold className="w-5 h-5 cursor-pointer" onClick={handleRepeatClick} />
//           </div>
//         </div>
//         <div className="w-full">
//           <div
//             className="lg:h-[5px] h-[3px] w-full bg-light70 dark:bg-gray15 rounded-full cursor-pointer"
//             onClick={handleProgressBarClick}
//           >
//             <div className="h-full bg-dark60 dark:bg-white rounded-full" style={{ width: `${progress}% `}} />
//           </div>
//           <div className="flex justify-between dark:text-light20 text-light50 text-xs mt-2">
//             <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
//             <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActiveMusic
// components/ActiveMusic.js

// src/components/ActiveMusic.js

// src/components/ActiveMusic.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPause, FaPlay } from 'react-icons/fa';
import { PiCaretLineRightFill, PiCaretLineLeftFill, PiRepeatBold } from 'react-icons/pi';
import { GoHeart } from 'react-icons/go';
import { play, pause, next, previous, repeat, setCurrentTime } from '../../slices/music.slice';

const ActiveMusic = () => {
  const dispatch = useDispatch();
  const currentMusicIndex = useSelector(state => state.music.currentMusicIndex);
  const musics = useSelector(state => state.music.musics);
  const playing = useSelector(state => state.music.playing);
  const duration = useSelector(state => state.music.duration);
  const currentTime = useSelector(state => state.music.currentTime);

  const handlePlayPause = () => {
    if (playing) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  };

  const handleNext = () => {
    dispatch(next());
  };

  const handlePrevious = () => {
    dispatch(previous());
  };

  const handleRepeatClick = () => {
    dispatch(repeat());
  };

  const handleProgressBarClick = (event) => {
    const progressBar = event.currentTarget;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const newTime = (clickX / progressBar.offsetWidth) * duration;
    dispatch(setCurrentTime(newTime));
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const coverImageUrl = musics[currentMusicIndex]?.coverImage ? `http://localhost:3000/${musics[currentMusicIndex].coverImage}` : '';

  if (!musics.length) return null;

  return (
    <div className="flex w-full">
      <div className="w-[94px] h-[105px] mr-6">
        <img className="object-cover w-full h-full rounded-[7.5px]" src={coverImageUrl} alt="" />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-between">
<div></div>
          <div className="flex items-center gap-4 dark:text-dark50 text-dark70">
            <PiCaretLineLeftFill onClick={handlePrevious} className="w-5 h-4 cursor-pointer" />
            <div
              onClick={handlePlayPause}
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center dark:bg-gray10 bg-lightgray shadow-custom cursor-pointer"
            >
              {playing ? <FaPause className="xs:text-xs" /> : <FaPlay className="xs:text-xs" />}
            </div>
            <PiCaretLineRightFill onClick={handleNext} className="w-5 h-4 cursor-pointer" />
          </div>
          <div className="dark:text-dark50 text-light50 text-sm">
            <PiRepeatBold className="w-5 h-5 cursor-pointer" onClick={handleRepeatClick} />
          </div>
        </div>
        <div className="w-full">
          <div
            className="lg:h-[5px] h-[3px] w-full dark:bg-light70 bg-dark70  rounded-full cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div className="h-full bg-dark60 dark:bg-white rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between dark:text-light20 text-light50 text-xs mt-2">
            <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
            <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveMusic;
