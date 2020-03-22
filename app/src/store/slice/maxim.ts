import {
  createSlice,
  PayloadAction,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import Service from '../../services/services';

const initialState: MaximState = {
  currentMaxim: {
    _id: '',
    maxim: '',
    maximNumber: 0
  },
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
  const response = await Service().fetchMaxim(maximNumber);

  if (response.error) {
    dispatch(errorFetchingMaxim({ ...response }));
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
      state = { ...state, ...action.payload, isError: false };
    },
    errorFetchingMaxim: (state, action: PayloadAction<MaximError>) => {
      return (state = { ...state, isError: true });
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

export interface MaximError {
  error: string;
}

export type AppThunk = ThunkAction<void, any, unknown, Action<string>>;
