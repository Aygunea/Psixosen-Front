
// import { createSlice } from '@reduxjs/toolkit';

// const audio = new Audio(); 

// const initialState = {
//   musics: [],
//   currentMusicIndex: 0,
//   playing: false,
//   duration: 0,
//   audioUrl: '', 
// };

// const musicSlice = createSlice({
//   name: 'music',
//   initialState,
//   reducers: {
//     setMusics(state, action) {
//       state.musics = action.payload;
//     },
//     setCurrentMusicIndex(state, action) {
//       state.currentMusicIndex = action.payload;
//       state.audioUrl = `http://localhost:3000/${state.musics[action.payload].url}`; // URL'yi güncelle

//     },
//     setPlaying(state, action) {
//       state.playing = action.payload;
//     },
//     setDuration(state, action) {
//       state.duration = action.payload;
//     },
//     play(state) {
//       if (state.musics.length > 0) {
//         if (audio.src !== `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`) {
//           audio.src = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
//           audio.load();
//         }
//         audio.play().catch(error => console.error('Error playing audio:', error));
//         state.playing = true;
//       }
//     },
//     pause(state) {
//       audio.pause();
//       state.playing = false;
//     },
//     next(state) {
//       if (state.musics.length > 0) {
//         state.currentMusicIndex = (state.currentMusicIndex + 1) % state.musics.length;
//         audio.pause();
//         audio.src = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
//         audio.load();
//         audio.play().catch(error => console.error('Error playing audio:', error));
//         state.playing = true;
//       }
//     },
//     previous(state) {
//       if (state.musics.length > 0) {
//         state.currentMusicIndex = (state.currentMusicIndex - 1 + state.musics.length) % state.musics.length;
//         audio.pause();
//         audio.src = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
//         audio.load();
//         audio.play().catch(error => console.error('Error playing audio:', error));
//         state.playing = true;
//       }
//     },
//     repeat(state) {
//       audio.currentTime = 0;
//       audio.play().catch(error => console.error('Error playing audio:', error));
//       state.playing = true;
//     },
//     setAudioDuration(state, action) {
//       state.duration = action.payload;
//     },
//   },
// });

// export const { setMusics, setCurrentMusicIndex, setPlaying, setDuration, play, pause, next, previous, repeat, setAudioDuration } = musicSlice.actions;
// export default musicSlice.reducer;
// export { audio }; 

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   musics: [],
//   currentMusicIndex: 0,
//   playing: false,
//   duration: 0,
//   audioUrl: '', 
// };

// const musicSlice = createSlice({
//   name: 'music',
//   initialState,
//   reducers: {
//     setMusics(state, action) {
//       state.musics = action.payload;
//     },
//     setCurrentMusicIndex(state, action) {
//       state.currentMusicIndex = action.payload;
//       state.audioUrl = `http://localhost:3000/${state.musics[action.payload].url}`;
//     },
//     setPlaying(state, action) {
//       state.playing = action.payload;
//     },
//     setDuration(state, action) {
//       state.duration = action.payload;
//     },
//     play(state) {
//       state.playing = true;
//     },
//     pause(state) {
//       state.playing = false;
//     },
//     next(state) {
//       state.currentMusicIndex = (state.currentMusicIndex + 1) % state.musics.length;
//       state.audioUrl = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
//       state.playing = true;
//     },
//     previous(state) {
//       state.currentMusicIndex = (state.currentMusicIndex - 1 + state.musics.length) % state.musics.length;
//       state.audioUrl = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
//       state.playing = true;
//     },
//     repeat(state) {
//       // audio.currentTime = 0;
//       state.audioUrl = state.audioUrl;
//       state.playing = true;
//     },
//     setAudioDuration(state, action) {
//       state.duration = action.payload;
//     },
//   },
// });

// export const { setMusics, setCurrentMusicIndex, setPlaying, setDuration, play, pause, next, previous, repeat, setAudioDuration } = musicSlice.actions;
// export default musicSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  musics: [],
  currentMusicIndex: 0,
  playing: false,
  duration: 0, 
  currentTime: 0, 
  audioUrl: '', 
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setMusics(state, action) {
      state.musics = action.payload;
    },
    setCurrentMusicIndex(state, action) {
      state.currentMusicIndex = action.payload;
      state.audioUrl = `http://localhost:3000/${state.musics[action.payload].url}`;
    },
    setPlaying(state, action) {
      state.playing = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    play(state) {
      state.playing = true;
    },
    pause(state) {
      state.playing = false;
    },
    next(state) {
      state.currentMusicIndex = (state.currentMusicIndex + 1) % state.musics.length;
      state.audioUrl = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
      state.playing = true;
    },
    previous(state) {
      state.currentMusicIndex = (state.currentMusicIndex - 1 + state.musics.length) % state.musics.length;
      state.audioUrl = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
      state.playing = true;
    },
    repeat(state) {
      // Şarkının currentTime'ını sıfırla
      state.currentTime = 0;
      // Şarkıyı baştan başlat
      // state.audioUrl = state.audioUrl;
      state.playing = true;
    },
  },
});

export const { setMusics, setCurrentMusicIndex, setPlaying, setDuration, setCurrentTime, play, pause, next, previous, repeat } = musicSlice.actions;
export default musicSlice.reducer;
