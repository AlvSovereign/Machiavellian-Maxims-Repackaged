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
        return { errorMessage: error.response.data.message };
      }
    },
    signin: async (credentials: SigninCredentials) => {
      try {
        const response = await axiosInstance.post('/signin', credentials);
        return response.data;
      } catch (error) {
        console.error(error);
        const { message, inputName }: FormsErrorResponse = error.response.data;
        return { errorMessage: message, errorOccured: inputName };
      }
    }
  };
};

export default API;

interface FormsErrorResponse {
  status: number;
  message: string;
  inputName: string;
}
