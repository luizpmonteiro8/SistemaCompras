import Axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const httpClient: AxiosInstance = Axios.create({
  baseURL: 'http://192.168.1.10:8080',
  withCredentials: true,
});

httpClient.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = token ? `${token}` : '';
  return config;
});
