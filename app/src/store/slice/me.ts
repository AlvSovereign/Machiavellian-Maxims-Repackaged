import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSuccess, MaximsSuccess } from 'services/api';

const initialState: MeState = {
  id: 0,
  email: '',
  savedMaxims: []
};

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    addMe: (state, action: PayloadAction<MeState>) =>
      (state = { ...state, ...action.payload }),
    removeMe: state => initialState,
    updateMaxims: (state, action: PayloadAction<MaximsSuccess>) => {
      return (state = { ...state, ...action.payload });
    }
  }
});

export const { addMe, removeMe, updateMaxims } = meSlice.actions;
export default meSlice.reducer;

export interface MeState extends FormSuccess {}
