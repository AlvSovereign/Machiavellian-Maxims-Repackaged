import {
  createSlice,
  PayloadAction,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';

const initialState: MaximState = {
  currentMaxim: {
    _id: '',
    maxim: '',
    maximNumber: 0
  }
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
    currentMaximNumber = getState().maxims.currentMaxim.maximNumber;
    maximNumber =
      arg === 'prev' ? currentMaximNumber - 1 : currentMaximNumber + 1;
  } else {
    maximNumber = getRandomNumber(1, 290);
  }

  const checkMaximInState = getState()[maximNumber!] || null;

  // if maxim is in state return this instead of fetching a new one
  if (checkMaximInState) {
    dispatch(getMaxim(checkMaximInState));
    return;
  }

  // otherwise fetch maxim from DB
  let response: any;
  try {
    response = await fetch(
      `${process.env.REACT_APP_API_URL}/maxim/${maximNumber}`
    );
  } catch (err) {
    console.error(err);
    return;
  }

  if (response.ok) {
    const maxim = await response.json();
    dispatch(getMaxim({ ...maxim.data }));
  }
};

const maximSlice = createSlice({
  name: 'maxim',
  initialState,
  reducers: {
    getMaxim: {
      reducer: (state, action: PayloadAction<any>) => {
        return { ...state, ...action.payload };
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
      state = { ...state, ...action.payload };
    }
  }
});

export { fetchMaxim };
export const { getMaxim } = maximSlice.actions;
export default maximSlice.reducer;

export interface MaximState {
  currentMaxim: MaximInterface;
  [maximNumber: number]: any;
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
export type AppThunk = ThunkAction<void, any, unknown, Action<string>>;
