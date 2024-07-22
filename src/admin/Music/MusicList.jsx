import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMusics } from '../../slices/music.slice';
import MusicItem from './MusicItem';

const MusicList = () => {
    const dispatch = useDispatch();
    const musics = useSelector(state => state.music.musics);
    useEffect(() => {
        // Müzik listesini Redux'tan alın, eğer boşsa API'den çekin
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
    }, [dispatch, musics]);

    return (
        <div className='py-3'>
            {musics.map((music, index) => (
                <MusicItem key={index} number={index+1} music={music} />
            ))}
        </div>
    )
}

export default MusicList
