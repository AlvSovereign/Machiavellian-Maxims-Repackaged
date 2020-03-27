import { createSlice } from '@reduxjs/toolkit';
import { FormSuccess } from 'services/api';
const initialState: MeState = {
  email: '',
  savedMaxims: []
};

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    addMe: (state, action) => (state = { ...state, ...action.payload })
  }
});

export const { addMe } = meSlice.actions;
export default meSlice.reducer;

export interface MeState extends FormSuccess {}
