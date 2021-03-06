import { httpClient } from '../http';
import { Purchases } from '../models/purchases';
import { itemPurchaseDTO, PurchasesDTO } from '../models/purchasesDTO';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

const resourceURL = '/purchases';

export const usePurchasesService = () => {
  const save = async (purchases: PurchasesDTO): Promise<AxiosRequestHeaders> => {
    const response: AxiosResponse<Purchases> = await httpClient.post<Purchases>(resourceURL, purchases);
    return response.headers;
  };

  const update = async (purchases: PurchasesDTO): Promise<void> => {
    const url = `${resourceURL}/${purchases.id}`;
    await httpClient.put<Purchases>(url, purchases);
  };

  const deletePurchases = async (id): Promise<void> => {
    const url = `${resourceURL}/${id}`;
    await httpClient.delete<Purchases>(url);
  };

  const loadPurchases = async (id): Promise<Purchases> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Purchases> = await httpClient.get(url);
    return response.data;
  };

  const loadPurchasesDTO = async (id: string | string[]): Promise<PurchasesDTO> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Purchases> = await httpClient.get(url);

    const itemList: itemPurchaseDTO[] = [];
    response.data.itemPurchaseList.map((i) => {
      const itemPurchase: itemPurchaseDTO = { id: null, price: null, quantity: null, productId: null, validaty: null };
      itemPurchase.id = i.id;
      itemPurchase.price = i.price;
      itemPurchase.quantity = i.quantity;
      itemPurchase.productId = i.stock.product.id;
      itemPurchase.validaty = i.validaty;
      itemList.push(itemPurchase);
    });

    const PurchasesDto: PurchasesDTO = {
      id: response.data.id,
      marketId: response.data.market.id,
      status: response.data.status,
      itemPurchaseDTOList: itemList,
      date: response.data.date,
    };

    return PurchasesDto;
  };

  const loadAllPurchases = async (): Promise<Purchases[]> => {
    const url = `${resourceURL}`;
    const response: AxiosResponse<Purchases[]> = await httpClient.get(url);
    return response.data;
  };

  const loadReportPurchases = async (): Promise<Blob> => {
    const url = `${resourceURL}/report`;
    const response: AxiosResponse<Blob> = await httpClient.get(url, { responseType: 'blob' });
    const bytes = response.data;
    return new Blob([bytes], { type: 'application/pdf' });
  };

  return {
    save,
    update,
    loadPurchases,
    deletePurchases,
    loadAllPurchases,
    loadPurchasesDTO,
    loadReportPurchases,
  };
};
