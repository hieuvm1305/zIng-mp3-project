import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  currentTime: 0,
  isRepeatAll: false,
  isRepeatOne: false,
  isRandom: false,
};

export const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setRepeatAll: (state, action) => {
      state.isRepeatAll = action.payload;
    },
    setRandom: (state, action) => {
      state.isRandom = action.payload;
    },
    setRepeatOne: (state, action) => {
      state.isRepeatOne = action.payload;
    },
  },
});

export const getIsPlay = (state) => state.play.isPlaying;
export const getCurrentTime = (state) => state.play.currentTime;
export const getRandomStatus = (state) => state.play.isRandom;
export const getRepeatAllStatus = (state) => state.play.isRepeatAll;
export const getRepeatOneStatus = (state) => state.play.isRepeatOne;

export const { setPlaying, setCurrentTime, setRepeatAll, setRepeatOne, setRandom } = playSlice.actions;
export default playSlice.reducer;
