// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './Slices/CounterSlice'
import UserSlice from './Slices/UserSlice';
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    UserData:UserSlice
  },
});
