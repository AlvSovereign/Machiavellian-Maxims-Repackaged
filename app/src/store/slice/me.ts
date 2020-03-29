import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSuccess } from 'services/api';
const initialState: MeState = {
  email: '',
  savedMaxims: []
};

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    addMe: (state, action: PayloadAction<MeState>) =>
      (state = { ...state, ...action.payload }),
    removeMe: state => initialState
  }
});

export const { addMe, removeMe } = meSlice.actions;
export default meSlice.reducer;

export interface MeState extends FormSuccess {}
