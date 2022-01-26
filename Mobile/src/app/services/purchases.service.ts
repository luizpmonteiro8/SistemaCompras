import { httpClient } from '../http';
import { Purchases } from '../models/purchases';
import { itemPurchaseDTO, PurchasesDTO } from '../models/purchasesDTO';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const resourceURL = '/purchases';

export const usePurchasesService = () => {
  const save = async (
    purchases: PurchasesDTO,
  ): Promise<AxiosRequestHeaders> => {
    const response: AxiosResponse<Purchases> = await httpClient.post<Purchases>(
      resourceURL,
      purchases,
    );
    return response.headers;
  };

  const update = async (purchases: PurchasesDTO): Promise<void> => {
    const url = `${resourceURL}/${purchases.id}`;
    await httpClient.put<Purchases>(url, purchases);
  };

  const deletePurchases = async (id: number): Promise<void> => {
    const url = `${resourceURL}/${id}`;
    await httpClient.delete<Purchases>(url);
  };

  const loadPurchases = async (id: number): Promise<Purchases> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Purchases> = await httpClient.get(url);
    return response.data;
  };

  const loadPurchasesDTO = async (
    id: string | string[],
  ): Promise<PurchasesDTO> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Purchases> = await httpClient.get(url);

    const itemList: itemPurchaseDTO[] = [];
    response.data.itemPurchaseList.map((i) => {
      const itemPurchase: itemPurchaseDTO = {
        id: 0,
        price: 0,
        quantity: 0,
        productId: 0,
        validaty: new Date(),
      };
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

  const loadReportPurchases = async (): Promise<any> => {
    const url = `http://192.168.1.10:8080${resourceURL}/report`;
    const token = await AsyncStorage.getItem('token');
    const { config, fs } = RNFetchBlob;
    const downloadDir = fs.dirs.DownloadDir;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        overwrite: true,
        title: 'relatorio.pdf',
        path: `${downloadDir}/relatorio.pdf`,
      },
      appendExt: 'pdf',
    };
    return await config(options)
      .fetch('POST', url, {
        Authorization: token || '',
        Accept: 'application/pdf',
        ContentType: 'application/pdf',
      })
      .then((res) => {
        return res;
      });
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
