import axios from 'axios';
import { AuthFormCredentials } from 'components/Modal';

const API = () => {
  const baseURL = process.env.REACT_APP_API_URL!;
  const axiosInstance = axios.create({ baseURL });

  return {
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
    googleSignin: async () => {
      try {
        const response: MaximsApiSuccessResponse = await axiosInstance.get(
          '/auth/google'
        );
        console.log('response: ', response);
        return response.data;
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
    signin: async (credentials: AuthFormCredentials) => {
      try {
        const response: FormsApiSuccessResponse = await axiosInstance.post(
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
        const response: MaximsApiSuccessResponse = await axiosInstance.get(
          '/auth/signout'
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    twitterSignin: async () => {
      try {
        const response: MaximsApiSuccessResponse = await axiosInstance.get(
          '/auth/twitter'
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    }
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
  email: string;
  savedMaxims: string[];
}
