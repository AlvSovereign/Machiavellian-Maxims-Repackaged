import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from 'services/api';
import { SigninCredentials } from 'components/Modal';
import { AppThunk } from 'store/store';

const initialState: UserState = {
  email: '',
  savedMaxims: [],
  errorMessage: '',
  isError: false
};

const userSignin = (credentials: SigninCredentials): AppThunk => async (
  dispatch,
  getState
) => {
  const response = await API().signin(credentials);
  // console.log('response: ', response);

  if (response.error) {
    dispatch(signinError({ ...response }));
    return;
  }
  dispatch(signin(response));
};

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<SigninCredentials>) => {
      return (state = { ...state, ...action.payload });
    },
    signinError: (state, action) => {
      return (state = {
        ...state,
        errorMessage: action.payload,
        isError: true
      });
    }
  }
});

export { userSignin };
export const { signin, signinError } = userSlice.actions;
export default userSlice.reducer;

export interface UserState {
  email: string;
  savedMaxims: string[];
  errorMessage: string;
  isError: boolean;
}
