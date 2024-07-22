// import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setDuration } from '../../slices/music.slice';
// import Head from '../Head/Head';
// import { Outlet } from 'react-router-dom';
// import Menu from '../../Mobile/Menu/Menu';

// const Main = () => {
//   const dispatch = useDispatch();
//   const audioRef = useRef(null);
//   const audioUrl = useSelector(state => state.music.audioUrl);

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (audio) {
//       audio.addEventListener('loadedmetadata', () => {
//         dispatch(setDuration(audio.duration));
//       });

//       return () => {
//         audio.removeEventListener('loadedmetadata', () => {
//           dispatch(setDuration(audio.duration));
//         });
//       };
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.src = audioUrl;
//     }
//   }, [audioUrl]);

//   return (
//     <div className="w-full h-screen grid grid-rows-[auto_1fr]">
//       <Head />
//       <div className="xs:relative xs:mt-[80px] bg-transparent sm:dark:bg-darkgray sm:bg-lightgray rounded-[10px] px-6 xs:px-0 pb-6 h-full overflow-y-auto">
//         <audio ref={audioRef} />
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Main;
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDuration, setCurrentTime } from '../../slices/music.slice';
import Head from '../Head/Head';
import { Outlet } from 'react-router-dom';
import Menu from '../../Mobile/Menu/Menu';

const Main = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const audioUrl = useSelector(state => state.music.audioUrl);
  const playing = useSelector(state => state.music.playing);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleLoadedMetadata = () => {
        dispatch(setDuration(audio.duration));
      };

      const handleTimeUpdate = () => {
        dispatch(setCurrentTime(audio.currentTime));
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      // Cleanup listeners
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [dispatch]);

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

  return (
    <div className="w-full h-screen grid grid-rows-[auto_1fr]">
      <Head />
      <div className="xs:relative xs:mt-[80px] bg-transparent sm:dark:bg-darkgray sm:bg-lightgray rounded-[10px] px-6 xs:px-0 pb-6 h-full overflow-y-auto">
        <audio ref={audioRef} />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
