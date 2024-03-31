import axios, { AxiosError } from 'axios';

const ApiClient = () => {
  const axiosApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 1000,
  });

  axiosApi.interceptors.request.use(async (request) => {
    return request;
  });

  axiosApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return axiosApi;
};

export const apiClient = ApiClient();
