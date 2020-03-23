import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppState = {
  showModal: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<any>) => {
      return (state = { ...state, ...action.payload });
    }
  }
});

export const { toggleModal } = appSlice.actions;
export default appSlice.reducer;

export interface AppState {
  showModal: boolean;
}
