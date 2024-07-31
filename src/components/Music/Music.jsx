import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMusics, setCurrentMusicIndex } from '../../slices/music.slice';
import PopularItem from './PopularItem';
import ActiveMusic from './ActiveMusic';

const Music = () => {
  const dispatch = useDispatch();
  const musics = useSelector(state => state.music.musics);
  const currentMusicIndex = useSelector(state => state.music.currentMusicIndex);

  useEffect(() => {
    if (musics.length === 0) {
      const getMusic = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/music');
          const data = await response.json();
          dispatch(setMusics(data));
        } catch (error) {
          console.error('Error fetching music:', error);
        }
      };

      getMusic();
    }
  }, [dispatch, musics.length]);

  return (
    <div className='h-full grid grid-rows-[auto_1fr]'>
      <div className='flex justify-between lg:px-0 px-6'>
        <p className='dark:text-dark100 text-gray10 font-bold lg:text-2xl text-xl py-[26px]'>Musiqi</p>
      </div>
      <div className='py-9 pb-8 lg:px-8 px-6 bg-transparent lg:dark:bg-darkblack lg:bg-lightwhite rounded-[10px] flex-grow h-full overflow-y-auto'>
        <div className='grid grid-rows-[1fr_auto] h-full'>
          <div className='overflow-y-auto xs:h-full xs:pb-12'>
            <p className='dark:text-dark70 text-light70 text-xl xs:text-sm'>All Songs</p>
            <div className='py-6 xs:py-2 pr-6 xs:pr-0'>
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
          </div>
          {currentMusicIndex !== null && (
            <div className="sticky bottom-0 mt-8 pb-[50px] lg:pb-0">
              <ActiveMusic />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Music;
