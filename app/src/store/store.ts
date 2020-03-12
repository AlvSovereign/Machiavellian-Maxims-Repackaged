import { configureStore } from '@reduxjs/toolkit';
import { maximSlice } from './slice/maxim';

const initialState = {
  maxim: {}
};

export const store: any = configureStore({
  reducer: maximSlice.reducer
});
