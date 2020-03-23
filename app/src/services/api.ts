import axios from 'axios';
import { SigninCredentials } from 'components/Modal';

const API = () => {
  const baseURL = process.env.REACT_APP_API_URL!;

  const axiosInstance = axios.create({ baseURL });

  return {
    fetchMaxim: async (maximNumber: number) => {
      try {
        const response = await axiosInstance.get(`/maxim/${maximNumber}`);

        return response.data.data;
      } catch (error) {
        console.error(error);
        new Error(error);
        return { error: error.message };
      }
    },
    signin: async (credentials: SigninCredentials) => {
      try {
        const response = await axiosInstance.post('/signin', credentials);
        console.log('response: ', response);

        return response.data.data;
      } catch (error) {
        console.error('error: ', error);
        return { error: error.message };
      }
    }
  };
};

export default API;
