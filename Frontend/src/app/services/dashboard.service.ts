import { httpClient } from '../http';
import { AxiosResponse } from 'axios';
import { Stock } from './../models/stock';
import { PurchasesFromMonth } from './../models/dashboard/index';
import { CountDashboard } from './../models/dashboard/index';

const resourceURL = '/dashboard';

export const useDashboardService = () => {
  const count = async (): Promise<CountDashboard> => {
    const url = `${resourceURL}/count`;
    const response: AxiosResponse<CountDashboard> = await httpClient.get<CountDashboard>(url);
    return response.data;
  };

  const sum = async (): Promise<PurchasesFromMonth> => {
    const url = `${resourceURL}/sumpurchases?year=2021`;
    const response: AxiosResponse<PurchasesFromMonth> = await httpClient.get<PurchasesFromMonth>(url);
    return response.data;
  };

  const quantity = async (): Promise<Stock> => {
    const url = `${resourceURL}/topquantitystock`;
    const response: AxiosResponse<Stock> = await httpClient.get<Stock>(url);
    return response.data;
  };

  return {
    count,
    sum,
    quantity,
  };
};
