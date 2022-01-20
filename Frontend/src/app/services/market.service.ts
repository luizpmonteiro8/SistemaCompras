import { httpClient } from '../http';
import { Market } from '../models/market';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

const resourceURL = '/market';

export const useMarketService = () => {
  const save = async (market: Market): Promise<AxiosRequestHeaders> => {
    const response: AxiosResponse<Market> = await httpClient.post<Market>(resourceURL, market);
    return response.headers;
  };

  const update = async (market: Market): Promise<void> => {
    const url = `${resourceURL}/${market.id}`;
    await httpClient.put<Market>(url, market);
  };

  const deleteMarket = async (id): Promise<void> => {
    const url = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const loadMarket = async (id): Promise<Market> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Market> = await httpClient.get(url);
    return response.data;
  };

  const loadAllMarket = async (): Promise<Market[]> => {
    const url = `${resourceURL}`;
    const response: AxiosResponse<Market[]> = await httpClient.get(url);
    return response.data;
  };

  return {
    save,
    update,
    loadMarket,
    deleteMarket,
    loadAllMarket,
  };
};
