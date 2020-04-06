import axios from 'axios';
import { AuthFormCredentials } from 'components/Modal';

const API = () => {
  const baseURL = process.env.REACT_APP_API_URL!;
  const options = {
    baseURL,
    withCredentials: false,
  };
  const axiosInstance = axios.create(options);

  return {
    bulkFetchMaxims: async (maxims: number[]) => {
      try {
        const response: MaximsApiSuccessResponse = await axiosInstance.post(
          '/maxim/getMaxims',
          maxims
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return error.response.data;
      }
    },
    fetchMaxim: async (maximNumber: number) => {
      try {
        const response: MaximsApiSuccessResponse = await axiosInstance.get(
          `/maxim/${maximNumber}`
        );
        return response.data.data;
      } catch (error) {
        console.error(error);
        return error.response.data;
      }
    },
    register: async (credentials: AuthFormCredentials) => {
      try {
        const response: FormsApiSuccessResponse = await axiosInstance.post(
          '/auth/signup',
          credentials
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return error.response.data;
      }
    },
    updateMaxims: async (payload: SaveMaximPayload) => {
      try {
        const response: MaximsApiSuccessResponse = await axiosInstance.post(
          '/user/updatemaxims',
          payload
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return error.response.data;
      }
    },
    signin: async (credentials: AuthFormCredentials) => {
      try {
        const response: AuthApiSuccessResponse = await axiosInstance.post(
          '/auth/signin',
          credentials
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return error.response.data;
      }
    },
    signout: async () => {
      try {
        const response: MaximsApiSuccessResponse = await axiosInstance.post(
          '/auth/signout'
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  };
};

export default API;

export interface MaximsApiErrorResponse {
  error: Error;
  message: string;
  status: number;
}

export interface MaximsApiSuccessResponse {
  data: { data: MaximsSuccess };
}

export interface MaximsSuccess {
  _id: string;
  maximNumber: number;
  maxim: string;
}

export interface FormsApiErrorResponse {
  status: number;
  message: string;
  inputName: string;
}
export interface FormsApiSuccessResponse {
  data: FormSuccess;
}

export interface FormSuccess {
  id: number;
  email: string;
  savedMaxims: number[];
}

export interface AuthApiSuccessResponse extends FormsApiSuccessResponse {}

interface SaveMaximPayload {
  userId: string;
  maxims: number[];
}
