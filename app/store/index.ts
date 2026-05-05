"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import transactionReducer from "./slices/transactionSlice";
import categoriesReducer from "./slices/categoriesSlice";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { Provider };