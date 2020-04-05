import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API, { MaximsApiErrorResponse, MaximsSuccess } from '../../services/api';
import { updateMaxims, MeState } from './me';
import { AppThunk } from 'store/store';

const initialState: MaximState = {
  errorMessage: '',
  isError: false
};

const fetchMaxim = (ref: number): AppThunk => async (dispatch, getState) => {
  let maximNumber: number;

  maximNumber = ref === 0 ? 290 : ref === 291 ? 1 : ref;

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
  const retrievedMaximsFromState: any = savedMaxims.map((maxim: number) => {
    return (
      { ...maximsFromState[maxim], maximNumber: maxim } ||
      maximsForBulkFetch.push(maxim)
    );
  });

  const response = maximsForBulkFetch.length
    ? await API().bulkFetchMaxims(maximsForBulkFetch)
    : [];

  const mergedMaxims = [
    ...retrievedMaximsFromState,
    ...response
  ].sort((a: MaximsSuccess, b: MaximsSuccess) =>
    a.maximNumber > b.maximNumber ? 1 : -1
  );

  return mergedMaxims;
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
            [maximNumber!]: {
              _id,
              maxim
            }
          }
        };
      }
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
  [maximNumber: number]: any;
  isError: boolean;
  errorMessage: string;
}

export interface StoredMaxim {
  _id: string;
  maxim: string;
}
