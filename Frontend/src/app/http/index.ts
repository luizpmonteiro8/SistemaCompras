import Axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

export const httpClient: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
});

httpClient.interceptors.request.use(async function (config) {
  const session = await getSession();
  config.headers.Authorization = session.accessToken ? `${session.accessToken}` : '';
  return config;
});
