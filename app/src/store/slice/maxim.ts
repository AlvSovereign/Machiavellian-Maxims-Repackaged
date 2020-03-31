import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API, { MaximsApiErrorResponse, MaximsSuccess } from '../../services/api';
import { updateMaxims, MeState } from './me';
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
  const response: MaximsSuccess &
    MaximsApiErrorResponse = await API().fetchMaxim(maximNumber);

  if (response.status === 500) {
    dispatch(errorFetchingMaxim(response.message));
    return;
  }

  dispatch(getMaxim({ ...response }));
};

const getSavedMaxims = (): AppThunk => async (dispatch, getState) => {
  const savedMaxims: number[] = getState().me.savedMaxims;
  const maximsFromState: StoredMaxim[] = getState().maxim;
  const maximsForBulkFetch: number[] = [];
  const retrievedMaximsFromState: StoredMaxim[] = savedMaxims.map(
    (maxim: number) => maximsFromState[maxim] || maximsForBulkFetch.push(maxim)
  );

  const response = maximsForBulkFetch.length
    ? await API().bulkFetchMaxims(maximsForBulkFetch)
    : [];

  const mergedMaxims = [...retrievedMaximsFromState, ...response];
};

const savedMaximsToUpdate = (maxims: number[]): AppThunk => async (
  dispatch,
  getState
) => {
  const userId: string = getState().me.id;
  const response: MaximsSuccess &
    MaximsApiErrorResponse = await API().updateMaxims({ userId, maxims });

  if (response.status === 500) {
    dispatch(errorFetchingMaxim(response.message));
    return;
  }

  dispatch(updateMaxims({ ...response }));
};

const maximSlice = createSlice({
  name: 'maxim',
  initialState,
  reducers: {
    getMaxim: {
      reducer: (state, action: PayloadAction<any>) => {
        return { ...state, ...action.payload, isError: false };
      },
      prepare: (fetchedMaxim: MaximsSuccess) => {
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
    currentMaxim: (state, action: PayloadAction<MaximsSuccess>) => {
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

export { fetchMaxim, getSavedMaxims, savedMaximsToUpdate };
export const { errorFetchingMaxim, getMaxim } = maximSlice.actions;
export default maximSlice.reducer;

export interface MaximState {
  currentMaxim: MaximsSuccess;
  [maximNumber: number]: any;
  isError: boolean;
  errorMessage: string;
}

export interface StoredMaxim {
  _id: string;
  maxim: string;
}
