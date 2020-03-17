import axios from 'axios';

const Service = () => {
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
    }
  };
};

export default Service;
