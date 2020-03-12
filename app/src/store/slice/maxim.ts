import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

enum MAXIMS {
  GET_RANDOM_MAXIM = 'GET_RANDOM_MAXIM'
}

const maximState = {
  ['randomId']: {
    maxim: null,
    maximNumber: null
  }
};

const getRandomMaxim = createAction(MAXIMS.GET_RANDOM_MAXIM, function prepare(
  maxim: number
) {
  return { payload: { maxim } };
});

const reducer = (state: any) => {
  const mockMaxim: any = {
    _id: '5e651d121ef7022d4751ec5d',
    maxim:
      'The objective of trickle truth is damage control, to minimise the damage done to one’s reputation when a loss of reputation is all but unavoidable.',
    maximNumber: 78
  };

  const newMaxim: any = {
    [mockMaxim._id]: {
      maxim: mockMaxim.maxim,
      maximNumber: mockMaxim.maximNumber
    }
  };

  const newState = { ...state, ...newMaxim };

  return newState;
};

const maximReducer = createReducer(maximState, {
  [getRandomMaxim.type]: reducer(maximState)
});

const maximSlice = createSlice({
  name: 'maxim',
  initialState: maximState,
  reducers: {
    maximReducer
  }
});

export { maximReducer, maximSlice };
