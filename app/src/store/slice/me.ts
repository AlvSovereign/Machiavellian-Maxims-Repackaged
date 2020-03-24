import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from 'services/api';
import { SigninCredentials } from 'components/Modal';
import { AppThunk } from 'store/store';
import { addAlert } from './alert';
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

export interface MeState {
  email: string;
  savedMaxims: string[];
}
