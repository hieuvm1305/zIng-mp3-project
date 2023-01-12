import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false,
    currentTime: 0,
    
}

export const playSlice = createSlice({
    name: "play",
    initialState,
    reducers: {
        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setCurrentTime : (state, action) => {
            state.currentTime = action.payload;
        }
    }
});

export const getIsPlay = (state) => state.play.isPlaying;
export const getCurrentTime = (state) => state.play.currentTime;
export const {setPlaying, setCurrentTime} = playSlice.actions;
export default playSlice.reducer;


