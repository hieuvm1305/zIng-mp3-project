import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false,
}

export const playSlice = createSlice({
    name: "play",
    initialState,
    reducers: {
        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        }
    }
});

export const getIsPlay = (state) => state.play.isPlaying;
export const {setPlaying} = playSlice.actions;
export default playSlice.reducer;


