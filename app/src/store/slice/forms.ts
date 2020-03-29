import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API, {
  FormsApiErrorResponse,
  FormsApiSuccessResponse
} from 'services/api';
import { AuthFormCredentials } from 'components/Modal';
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

const handleErrors = (
  response: FormsApiSuccessResponse & FormsApiErrorResponse,
  dispatch: any
) => {
  const { message, inputName } = response;
  dispatch(
    signinError({
      auth: {
        errorMessage: message,
        errorOccured: inputName,
        isError: true
      }
    })
  );
  dispatch(
    addAlert({
      dismissable: true,
      id: Date.now(),
      message: message,
      type: 'error'
    })
  );
};

const googleSignin = (): AppThunk => async dispatch => {
  const response = await API().googleSignin();
  console.log('response: ', response);
};

const twitterSignin = (): AppThunk => async dispatch => {
  const response = await API().twitterSignin();
  console.log('response: ', response);
};

const userRegister = (
  credentials: AuthFormCredentials
): AppThunk => async dispatch => {
  dispatch(clearErrors());

  const response: FormsApiSuccessResponse &
    FormsApiErrorResponse = await API().register(credentials);
  if (response.status === 401) {
    handleErrors(response, dispatch);
    return;
  }

  dispatch(addMe(response));
  dispatch(toggleModal({ showModal: false }));
  dispatch(
    addAlert({
      autoDismiss: 5000,
      id: Date.now(),
      message: `Welcome to Machiavellan Maxims!`,
      type: 'success'
    })
  );
};

const userSignin = (
  credentials: AuthFormCredentials
): AppThunk => async dispatch => {
  dispatch(clearErrors());

  const response: FormsApiSuccessResponse &
    FormsApiErrorResponse = await API().signin(credentials);

  if (response.status === 401) {
    handleErrors(response, dispatch);
    return;
  }

  dispatch(addMe(response));
  dispatch(toggleModal({ showModal: false }));
  dispatch(
    addAlert({
      autoDismiss: 5000,
      id: Date.now(),
      message: `Welcome back!!`,
      type: 'success'
    })
  );
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    clearErrors: () => initialState,
    signinError: (state, action: PayloadAction<FormsState>) =>
      (state = { ...state, ...action.payload })
  }
});

export { googleSignin, twitterSignin, userRegister, userSignin };
export const { clearErrors, signinError } = formsSlice.actions;
export default formsSlice.reducer;

export interface FormsState {
  auth: FormError;
}

interface FormError {
  errorMessage: string;
  errorOccured: string;
  isError: boolean;
}
