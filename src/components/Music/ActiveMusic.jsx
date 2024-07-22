// import React, { useEffect, useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaPause, FaPlay } from 'react-icons/fa';
// import { PiCaretLineRightFill, PiCaretLineLeftFill } from 'react-icons/pi';
// import { GoHeart } from 'react-icons/go';
// import { play, pause, next, previous, repeat, setDuration } from '../../slices/music.slice';
// import { PiRepeatBold } from 'react-icons/pi';

// const ActiveMusic = () => {
//   const dispatch = useDispatch();
//   const [currentTime, setCurrentTime] = useState(0);
//   const duration = useSelector(state => state.music.duration);
//   const currentMusic = useSelector(state => state.music.musics[state.music.currentMusicIndex]);
//   const playing = useSelector(state => state.music.playing);
//   const audioRef = useRef(new Audio());

//   useEffect(() => {
//     const audio = audioRef.current;

//     const updateCurrentTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => dispatch(setDuration(audio.duration));

//     audio.addEventListener('timeupdate', updateCurrentTime);
//     audio.addEventListener('loadedmetadata', updateDuration);

//     return () => {
//       audio.removeEventListener('timeupdate', updateCurrentTime);
//       audio.removeEventListener('loadedmetadata', updateDuration);
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (currentMusic) {
//       audio.src = `http://localhost:3000/${currentMusic.url}`;

//       const handleCanPlayThrough = () => {
//         if (playing) {
//           audio.play().catch(error => console.error('Error playing audio:', error));
//         } else {
//           audio.pause();
//         }
//       };

//       audio.addEventListener('canplaythrough', handleCanPlayThrough);

//       return () => {
//         audio.removeEventListener('canplaythrough', handleCanPlayThrough);
//       };
//     }
//   }, [currentMusic, playing]);

//   const handlePlayPause = () => {
//     const audio = audioRef.current;

//     if (playing) {
//       dispatch(pause());
//       audio.pause();
//     } else {
//       dispatch(play());
//       audio.play().catch(error => console.error('Error playing audio:', error));
//     }
//   };

//   const handleNext = () => {
//     dispatch(next());
//   };

//   const handlePrevious = () => {
//     dispatch(previous());
//   };

//   const handleRepeatClick = () => {
//     dispatch(repeat());
//     audioRef.current.currentTime = 0;
//     audioRef.current.play().catch(error => console.error('Error playing audio:', error));
//   };

//   const handleProgressBarClick = event => {
//     const progressBar = event.target;
//     const clickX = event.clientX - progressBar.getBoundingClientRect().left;
//     const newTime = (clickX / progressBar.offsetWidth) * duration;
//     audioRef.current.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   useEffect(() => {
//     const handleEnded = () => {
//       dispatch(next());
//     };

//     const audio = audioRef.current;
//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, [dispatch]);

//   if (!currentMusic) {
//     return null;
//   }
//   const coverImageUrl = `http://localhost:3000/${currentMusic.coverImage}`

//   return (
//     <div className="py-8 flex w-full">
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
//               {playing ? <FaPause /> : <FaPlay />}
//             </div>
//             <PiCaretLineRightFill onClick={handleNext} className="w-5 h-4 cursor-pointer" />
//           </div>
//           <div onClick={handleRepeatClick} className="dark:text-dark50 text-dark70 text-sm cursor-pointer">
//             <PiRepeatBold className="w-4 h-4" />
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-3 py-2">
//           <div className="text-dark70 text-xs">
//             {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
//           </div>
//           <div
//             onClick={handleProgressBarClick}
//             className="relative w-full dark:border-dark20 border-light20 border rounded-full cursor-pointer"
//           >
//             <div
//               style={{ width: `${progress}%` }}
//               className="absolute top-0 left-0 h-full rounded-full dark:bg-dark50 bg-light50"
//             ></div>
//           </div>
//           <div className="text-dark70 text-xs">
//             {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActiveMusic;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaPause, FaPlay } from 'react-icons/fa';
// import { PiCaretLineRightFill, PiCaretLineLeftFill } from 'react-icons/pi';
// import { GoHeart } from 'react-icons/go';
// import { play, pause, next, previous, repeat, setDuration, setPlaying, audio } from '../../slices/music.slice';
// import { PiRepeatBold } from 'react-icons/pi';

// const ActiveMusic = () => {
//   const dispatch = useDispatch();
//   const [currentTime, setCurrentTime] = useState(0);
//   const duration = useSelector(state => state.music.duration);
//   const currentMusic = useSelector(state => state.music.musics[state.music.currentMusicIndex]);
//   const playing = useSelector(state => state.music.playing);

//   useEffect(() => {
//     const updateCurrentTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => dispatch(setDuration(audio.duration));

//     audio.addEventListener('timeupdate', updateCurrentTime);
//     audio.addEventListener('loadedmetadata', updateDuration);

//     return () => {
//       audio.removeEventListener('timeupdate', updateCurrentTime);
//       audio.removeEventListener('loadedmetadata', updateDuration);
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (currentMusic) {
//       audio.src = `http://localhost:3000/${currentMusic.url}`;

//       const handleCanPlayThrough = () => {
//         if (playing) {
//           audio.play().catch(error => console.error('Error playing audio:', error));
//         } else {
//           audio.pause();
//         }
//       };

//       audio.addEventListener('canplaythrough', handleCanPlayThrough);

//       return () => {
//         audio.removeEventListener('canplaythrough', handleCanPlayThrough);
//       };
//     }
//   }, [currentMusic, playing]);

//   const handlePlayPause = () => {
//     if (playing) {
//       dispatch(pause());
//       audio.pause();
//     } else {
//       dispatch(play());
//       audio.play().catch(error => console.error('Error playing audio:', error));
//     }
//   };

//   const handleNext = () => {
//     dispatch(next());
//   };

//   const handlePrevious = () => {
//     dispatch(previous());
//   };

//   const handleRepeatClick = () => {
//     dispatch(repeat());
//     audio.currentTime = 0;
//     audio.play().catch(error => console.error('Error playing audio:', error));
//   };

//   const handleProgressBarClick = event => {
//     const progressBar = event.target;
//     const clickX = event.clientX - progressBar.getBoundingClientRect().left;
//     const newTime = (clickX / progressBar.offsetWidth) * duration;
//     audio.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   useEffect(() => {
//     const handleEnded = () => {
//       dispatch(next());
//     };

//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, [dispatch]);

//   if (!currentMusic) {
//     return null;
//   }
//   const coverImageUrl = `http://localhost:3000/${currentMusic.coverImage}`;

//   return (
//     <div className="py-8 flex w-full">
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
//               {playing ? <FaPause className="w-4 h-5" /> : <FaPlay className="w-4 h-5" />}
//             </div>
//             <PiCaretLineRightFill onClick={handleNext} className="w-5 h-4 cursor-pointer" />
//           </div>
//           <div>
//             <PiRepeatBold
//               onClick={handleRepeatClick}
//               className="w-5 h-4 cursor-pointer dark:text-dark50 text-light50"
//             />
//           </div>
//         </div>
//         <div>
//           <h3 className="font-medium text-xl leading-[18px]">{currentMusic.name}</h3>
//           <span className="block text-sm dark:text-dark50 text-dark70">{currentMusic.artist}</span>
//         </div>
//         <div className="w-full flex items-center gap-2">
//           <span className="dark:text-dark50 text-light50 text-xs">
//             {new Date(currentTime * 1000).toISOString().substr(14, 5)}
//           </span>
//           <div
//             className="flex-1  bg-gray70 relative h-[4px] w-full dark:bg-dark20 bg-light20  rounded-full cursor-pointer"
//             onClick={handleProgressBarClick}
//           >
//             <div
//               className="absolute top-0 left-0 h-full rounded-full dark:bg-dark50 bg-light50"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <span className="dark:text-dark50 text-light50 text-xs">
//             {new Date(duration * 1000).toISOString().substr(14, 5)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActiveMusic;

// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaPause, FaPlay } from 'react-icons/fa';
// import { PiCaretLineRightFill, PiCaretLineLeftFill, PiRepeatBold } from 'react-icons/pi';
// import { GoHeart } from 'react-icons/go';
// import { play, pause, next, previous, repeat } from '../../slices/music.slice';

// const ActiveMusic = () => {
//   const dispatch = useDispatch();
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null);
//   const currentMusicIndex = useSelector(state => state.music.currentMusicIndex);
//   const musics = useSelector(state => state.music.musics);
//   const playing = useSelector(state => state.music.playing);
//   const audioUrl = useSelector(state => state.music.audioUrl);

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (audio) {
//       audio.src = audioUrl;

//       const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
//       const handleLoadedMetadata = () => setDuration(audio.duration);

//       audio.addEventListener('timeupdate', handleTimeUpdate);
//       audio.addEventListener('loadedmetadata', handleLoadedMetadata);

//       return () => {
//         audio.removeEventListener('timeupdate', handleTimeUpdate);
//         audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//       };
//     }
//   }, [audioUrl]);

//   useEffect(() => {
//     if (audioRef.current) {
//       if (playing) {
//         audioRef?.current.play().catch(error => console.error('Error playing audio:', error));
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [playing]);
//   useEffect(() => {
//     console.log(duration);
//   }, [duration])
//   const handlePlayPause = () => {
//     if (playing) {
//       dispatch(pause());
//     } else {
//       dispatch(play());
//     }
//   };

//   const handleNext = () => {
//     dispatch(next());
//   };

//   const handlePrevious = () => {
//     dispatch(previous());
//   };

//   const handleRepeatClick = () => {
//     dispatch(repeat());
//   };

  // const handleProgressBarClick = event => {
  //   const progressBar = event.target;
  //   const clickX = event.clientX - progressBar.getBoundingClientRect().left;
  //   const newTime = (clickX / progressBar.offsetWidth) * duration;
  //   audioRef.current.currentTime = newTime;
  //   setCurrentTime(newTime);
  // };

//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   if (!musics.length) return null;

//   const coverImageUrl = `http://localhost:3000/${musics[currentMusicIndex].coverImage}`;

//   return (
//     <div className="py-8 flex w-full">
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
//               {playing ? <FaPause className="w-4 h-5" /> : <FaPlay className="w-4 h-5" />}
//             </div>
//             <PiCaretLineRightFill onClick={handleNext} className="w-5 h-4 cursor-pointer" />
//           </div>
//           <div className="dark:text-dark50 text-light50 text-sm">
//             <PiRepeatBold className="w-5 h-5 cursor-pointer" onClick={handleRepeatClick} />
//           </div>
//         </div>
//         <div>
//           <div className="font-bold text-[19px] dark:text-white text-dark10 leading-5">{musics[currentMusicIndex].name}</div>
//           <div className="text-[13px] text-light50 mt-1">{musics[currentMusicIndex].artist}</div>
//         </div>
//         <div className="w-full">
//           <div
//             className="h-[6px] bg-light70 dark:bg-gray15 rounded-full cursor-pointer"
//             onClick={handleProgressBarClick}
//           >
//             <div className="h-full bg-dark60 dark:bg-white rounded-full" style={{ width: `${progress}%` }} />
//           </div>
//           <div className="flex justify-between dark:text-light20 text-light50 text-xs mt-2">
//             <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
//             <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
//           </div>
//         </div>
//       </div>
//       <audio ref={audioRef} />
//     </div>
//   );
// };

// export default ActiveMusic;
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPause, FaPlay } from 'react-icons/fa';
import { PiCaretLineRightFill, PiCaretLineLeftFill, PiRepeatBold } from 'react-icons/pi';
import { GoHeart } from 'react-icons/go';
import { play, pause, next, previous, repeat, setCurrentTime } from '../../slices/music.slice';

const ActiveMusic = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const currentMusicIndex = useSelector(state => state.music.currentMusicIndex);
  const musics = useSelector(state => state.music.musics);
  const playing = useSelector(state => state.music.playing);
  const duration = useSelector(state => state.music.duration);
  const currentTime = useSelector(state => state.music.currentTime);
  const audioUrl = useSelector(state => state.music.audioUrl);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.src = audioUrl;
      if (playing) {
        audio.play().catch(error => console.error('Error playing audio:', error));
      } else {
        audio.pause();
      }
    }
  }, [audioUrl, playing]);

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
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0; // Şarkının başına dön
      audio.play().catch(error => console.error('Error playing audio:', error));
    }
    dispatch(repeat());
  };
  

  const handleProgressBarClick = event => {
    const progressBar = event.currentTarget; 
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const newTime = (clickX / progressBar.offsetWidth) * duration;
    
    // Audio öğesinin currentTime özelliğini güncelle
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    
    // Redux store'a güncellenmiş currentTime'ı gönder
    dispatch(setCurrentTime(newTime));
    console.log(currentTime);
  };
  
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const coverImageUrl = musics[currentMusicIndex]?.coverImage 
    ? `http://localhost:3000/${musics[currentMusicIndex].coverImage}`
    : '';

  if (!musics.length) return null;

  return (
    <div className="py-8 flex w-full">
      <div className="w-[94px] h-[105px] mr-6">
        <img className="object-cover w-full h-full rounded-[7.5px]" src={coverImageUrl} alt="" />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-between">
          <div className="dark:text-dark50 text-light50 text-sm">
            <GoHeart className="w-4 h-4" />
          </div>
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
            className="h-[5px] w-full bg-light70 dark:bg-gray15 rounded-full cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div className="h-full bg-dark60 dark:bg-white rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between dark:text-light20 text-light50 text-xs mt-2">
            <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
            <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default ActiveMusic;
