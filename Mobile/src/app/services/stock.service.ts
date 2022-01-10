import { httpClient } from '../http';
import { Stock } from '../models/stock';
import { AxiosResponse } from 'axios';

const resourceURL = '/stocks';

export const useStockService = () => {
  const loadStock = async (id:number): Promise<Stock> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Stock> = await httpClient.get(url);
    return response.data;
  };

  const loadAllStock = async (): Promise<Stock[]> => {
    const url = `${resourceURL}`;
    const response: AxiosResponse<Stock[]> = await httpClient.get(url);
    return response.data;
  };

  return {
    loadStock,
    loadAllStock,
  };
};
