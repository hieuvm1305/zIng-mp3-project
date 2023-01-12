import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import musicSlice from "../redux/musicSlice";
import homeSlice from "../redux/homeSlice";
import playSlice from "../redux/playSlice";
import playListSlice from "../redux/playListSlice";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  music: musicSlice,
  home: homeSlice,
  play: playSlice,
  album: playListSlice,
});
const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["music"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
