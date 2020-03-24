import {
  createSlice,
  PayloadAction,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import API from '../../services/api';
import { AppThunk } from 'store/store';

const initialState: MaximState = {
  currentMaxim: {
    _id: '',
    maxim: '',
    maximNumber: 0
  },
  errorMessage: '',
  isError: false
};

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const fetchMaxim = (arg?: 'next' | 'prev'): AppThunk => async (
  dispatch,
  getState
) => {
  let currentMaximNumber: number;
  let maximNumber: number;

  if (arg) {
    currentMaximNumber = getState().maxim.currentMaxim.maximNumber;
    maximNumber =
      arg === 'prev' ? currentMaximNumber - 1 : currentMaximNumber + 1;

    maximNumber =
      maximNumber === 0
        ? (maximNumber = 290)
        : maximNumber === 291
        ? (maximNumber = 1)
        : maximNumber;
  } else {
    maximNumber = getRandomNumber(1, 290);
  }

  const maximInState = getState().maxim[maximNumber] || null;

  // if maxim is in state return this instead of fetching a new one
  if (maximInState) {
    const maxim = {
      maximNumber,
      ...maximInState
    };
    dispatch(getMaxim(maxim));
    return;
  }

  // otherwise fetch maxim from DB
  const response = await API().fetchMaxim(maximNumber);

  if (response.errorMessage) {
    dispatch(errorFetchingMaxim(response.errorMessage));
    return;
  }

  dispatch(getMaxim({ ...response }));
};

const maximSlice = createSlice({
  name: 'maxim',
  initialState,
  reducers: {
    getMaxim: {
      reducer: (state, action: PayloadAction<any>) => {
        return { ...state, ...action.payload, isError: false };
      },
      prepare: (fetchedMaxim: MaximInterface) => {
        const { _id, maxim, maximNumber } = fetchedMaxim;

        return {
          payload: {
            currentMaxim: {
              ...fetchedMaxim
            },
            [maximNumber!]: {
              _id,
              maxim
            }
          }
        };
      }
    },
    currentMaxim: (state, action: PayloadAction<MaximInterface>) => {
      return (state = { ...state, ...action.payload, isError: false });
    },
    errorFetchingMaxim: (state, action: PayloadAction<string>) => {
      return (state = {
        ...state,
        errorMessage: action.payload,
        isError: true
      });
    }
  }
});

export { fetchMaxim };
export const { errorFetchingMaxim, getMaxim } = maximSlice.actions;
export default maximSlice.reducer;

export interface MaximState {
  currentMaxim: MaximInterface;
  [maximNumber: number]: any;
  isError: boolean;
  errorMessage: string;
}

export interface StoredMaxim {
  _id: string;
  maxim: string;
}

export interface MaximInterface {
  _id: string;
  maxim: string;
  maximNumber: number;
}
