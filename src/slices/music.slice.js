import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  musics: [],
  currentMusicIndex: null,
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
      const index = action.payload;
      if (state.musics[index]) {
        state.currentMusicIndex = index;
        state.audioUrl = `http://localhost:3000/${state.musics[index].url}`;
      } else {
        state.currentMusicIndex = null;
        state.audioUrl = '';
      }
    },
    play(state) {
      state.playing = true;
    },
    pause(state) {
      state.playing = false;
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
    next(state) {
      if (state.musics.length > 0) {
        state.currentMusicIndex = (state.currentMusicIndex + 1) % state.musics.length;
        state.audioUrl = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
      }
    },
    previous(state) {
      if (state.musics.length > 0) {
        state.currentMusicIndex = (state.currentMusicIndex - 1 + state.musics.length) % state.musics.length;
        state.audioUrl = `http://localhost:3000/${state.musics[state.currentMusicIndex].url}`;
      }
    },
    repeat(state) {
      state.currentTime = 0;
    },
  },
});

export const {
  setMusics,
  setCurrentMusicIndex,
  setPlaying,
  setDuration,
  setCurrentTime,
  next,
  play,
  pause,
  previous,
  repeat,
} = musicSlice.actions;

export default musicSlice.reducer;
