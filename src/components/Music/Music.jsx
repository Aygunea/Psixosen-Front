import React, { useEffect } from 'react';
import MusicItem from './MusicItem';
import PopularItem from './PopularItem';
import ActiveMusic from './ActiveMusic';
import { useSelector, useDispatch } from 'react-redux';
import { setMusics, setCurrentMusicIndex, setPlaying } from '../../slices/music.slice';

const Music = () => {
  const dispatch = useDispatch();
  const musics = useSelector(state => state.music.musics);
  useEffect(() => {
    if (musics.length === 0) {
      const getMusic = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/music');
          const data = await response.json();
          dispatch(setMusics(data));
        } catch (error) {
          console.error('Müzikleri alma hatası:', error);
        }
      };

      getMusic(); 
    }
  }, [dispatch, musics.length]);

  return (
    <>
      <p className='dark:text-dark50 text-light50 text-sm xs:text-xs text-end mb-4'>Hamısına bax</p>
      <div className="grid grid-cols-[170px_auto] xs:grid-cols-[135px_auto] gap-9 xs:gap-7 mb-8">
        <button className=''>
          <img className='h-[150px] xs:h-[114px] w-[170px] xs:w-[135px] object-cover rounded-[5px] mb-3'
            src={require('../../images/music.jpeg')} alt="" />
          <div className="flex flex-col gap-1 text-left py-3">
            <p className='dark:text-dark100 text-gray10 text-base xs:text-sm'>Mənim pleylistim</p>
          </div>
        </button>
       
        <div className="grid grid-flow-col auto-cols-[170px] xs:auto-cols-[135px] gap-9 xs:gap-7 pb-4 xs:pb-2 overflow-x-auto scrollbar-hide">
            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />
        </div>
      </div>
      <p className='dark:text-dark70 text-light70 text-xl xs:text-sm'>Ən Məşhurları</p>
      <div className="py-6 xs:py-2">
        {musics.map((music, index) => (
          <PopularItem
            key={index}
            number={index + 1}
            title={music.title}
            duration={music.duration}
            artist={music.artist}
            musicFile={music.url}
            coverImage={music.coverImage}
            watchCount={music.watchCount}
            onClick={() => dispatch(setCurrentMusicIndex(index))}
          />
        ))}
      </div>
      <ActiveMusic />
    </>
  );
};

export default Music;

