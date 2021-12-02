import Axios, { AxiosInstance } from 'axios';
import { getSession, useSession } from 'next-auth/client';

export const httpClient: AxiosInstance = Axios.create({
  baseURL: 'http://192.168.1.9:8080',
  withCredentials: true,
});

httpClient.interceptors.request.use(async function (config) {
  const [session, loading] = useSession();
  config.headers.Authorization = session.accessToken ? `${session.accessToken}` : '';

  return config;
});
