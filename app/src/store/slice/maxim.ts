import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MaximState = {};

const maximSlice = createSlice({
  name: 'maxim',
  initialState,
  reducers: {
    getRandomMaxim: {
      reducer: (state, action: PayloadAction<MaximState>) => {
        return { ...state, ...action.payload };
      },
      prepare: (fetchedMaxim: MaximAction) => {
        const { _id, maxim, maximNumber } = fetchedMaxim;

        return {
          payload: {
            [maximNumber]: {
              _id,
              maxim
            }
          }
        };
      }
    }
  }
});

export const { getRandomMaxim } = maximSlice.actions;
export default maximSlice.reducer;

interface MaximState {
  [maximNumber: number]: {
    _id: string;
    maxim: string;
  };
}

interface MaximAction {
  _id: string;
  maxim: string;
  maximNumber: number;
}
