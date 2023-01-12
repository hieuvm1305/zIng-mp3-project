import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playList : [],
}

export const playListSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setPlayList: (state, action) => {
            state.playList = action.payload;
        },
    },
})

export const getPlayList = (state) => state.album.playList;
export const {setPlayList} = playListSlice.actions;
export default playListSlice.reducer;