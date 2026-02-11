import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import soalReducer from "./features/soalSlice";
import userReducer from "./features/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  api: baseApi.reducer,
  user: persistReducer(persistConfig, userReducer),
  soal: soalReducer,
});
