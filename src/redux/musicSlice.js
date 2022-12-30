import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curSongId: null,
};
export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurSongId: (state, action) => {
      state.curSongId = action.payload;
    },
  },
});

export const getCurSongId = (state) => state.music.curSongId;
export const { setCurSongId } = musicSlice.actions;
export default musicSlice.reducer;
