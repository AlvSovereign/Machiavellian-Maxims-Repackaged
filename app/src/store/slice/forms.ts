import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from 'services/api';
import { SigninCredentials } from 'components/Modal';
import { AppThunk } from 'store/store';
import { addAlert } from './alert';
import { addMe } from './me';
import { toggleModal } from './app';

const initialState: FormsState = {
  auth: {
    errorOccured: '',
    errorMessage: '',
    isError: false
  }
};

const userSignin = (
  credentials: SigninCredentials
): AppThunk => async dispatch => {
  dispatch(clearErrors());

  const response = await API().signin(credentials);

  if (response.errorMessage) {
    dispatch(
      signinError({
        auth: {
          errorMessage: response.errorMessage,
          errorOccured: response.errorOccured,
          isError: true
        }
      })
    );
    dispatch(
      addAlert({
        dismissable: true,
        id: Date.now(),
        message: response.errorMessage,
        type: 'error'
      })
    );
    return;
  }

  dispatch(addMe(response));
  dispatch(toggleModal({ showModal: false }));
  dispatch(
    addAlert({
      autoDismiss: 5000,
      id: Date.now(),
      message: `Welcome back!!`,
      type: 'error'
    })
  );
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    clearErrors: state => initialState,
    signinError: (state, action: PayloadAction<FormsState>) =>
      (state = { ...state, ...action.payload })
  }
});

export { userSignin };
export const { clearErrors, signinError } = formsSlice.actions;
export default formsSlice.reducer;

export interface FormsState {
  auth: {
    errorMessage: string;
    errorOccured: string;
    isError: boolean;
  };
}
