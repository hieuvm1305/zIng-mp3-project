import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playList: [],
  playListArtist: [],
};

export const playListSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlayList: (state, action) => {
      state.playList = action.payload;
    },
    setPlayListArtist: (state, action) => {
      state.playListArtist = action.payload;
    },
  },
});

export const getPlayList = (state) => state.album.playList;
export const getPlayListArtist = (state) => state.album.playListArtist;
export const { setPlayList, setPlayListArtist } = playListSlice.actions;
export default playListSlice.reducer;
