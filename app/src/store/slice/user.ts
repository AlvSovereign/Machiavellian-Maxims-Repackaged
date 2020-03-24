import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from 'services/api';
import { SigninCredentials } from 'components/Modal';
import { AppThunk } from 'store/store';
import { addAlert } from './alert';
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

  if (response.errorMessage) {
    dispatch(signinError(response.errorMessage));
    dispatch(
      addAlert({
        autoDismiss: 4000,
        id: Date.now(),
        message: response.errorMessage,
        type: 'error'
      })
    );
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
    signinError: (state, action: PayloadAction<string>) => {
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
