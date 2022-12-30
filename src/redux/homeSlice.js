import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHome } from "../service";

const initialState = {
  banner: [],
};

export const getHomeAction = createAsyncThunk("gethome", async () => {
  try {
    const response = await getHome();
    if (response?.data.err === 0) {
      return response.data.data.items;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
});

export const homeSice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomeAction.fulfilled,(state, action) => {
      state.banner =
        action.payload?.find((item) => item.sectionType === "banner")?.items ||
        null;
    })
  },
});

export const selectBanner = (state) => state.home.banner;
export default homeSice.reducer;