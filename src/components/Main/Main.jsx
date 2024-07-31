import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDuration, setCurrentTime, play, pause, next, previous, repeat } from '../../slices/music.slice';
import { Outlet } from 'react-router-dom';
import throttle from 'lodash.throttle';
import Head from '../Head/Head';


const Main = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const audioUrl = useSelector(state => state.music.audioUrl);
  const playing = useSelector(state => state.music.playing);
  const currentTime = useSelector(state => state.music.currentTime);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleLoadedMetadata = () => {
        dispatch(setDuration(audio.duration));
      };

      const handleTimeUpdate = throttle(() => {
        dispatch(setCurrentTime(audio.currentTime));
      }, 1000);

      const handleEnded = () => {
        dispatch(next());
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      if (playing) {
        audio.play().catch(error => console.error('Error playing audio:', error));
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [dispatch, audioUrl, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = audioUrl;
      if (playing) {
        audio.play().catch(error => console.error('Error playing audio:', error));
      }
    }
  }, [audioUrl, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <div className="w-full h-screen grid grid-rows-[auto_1fr]">
    <Head />
      <div className="relative mt-[80px] pb-[100px] lg:pb-6 lg:mt-0 bg-transparent lg:dark:bg-darkgray lg:bg-lightgray rounded-[10px] lg:px-6 px-0 h-full overflow-y-auto">
        <audio ref={audioRef} />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
