import { httpClient } from '../http';
import { Product } from '../models/product';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { ProductDTO } from 'app/models/productDTO';

const resourceURL = '/products';

export const useProductService = () => {
  const save = async (product: ProductDTO): Promise<AxiosRequestHeaders> => {
    const response: AxiosResponse<Product> = await httpClient.post<Product>(resourceURL, product);
    return response.headers;
  };

  const update = async (product: ProductDTO): Promise<void> => {
    const url = `${resourceURL}/${product.id}`;
    console.log(url);
    await httpClient.put<Product>(url, product);
  };

  const deleteProduct = async (id): Promise<void> => {
    const url = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const loadProduct = async (id): Promise<Product> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Product> = await httpClient.get(url);
    return response.data;
  };

  const loadProductDto = async (id): Promise<ProductDTO> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Product> = await httpClient.get(url);
    const productDto = {
      id: response.data.id,
      name: response.data.name,
      blocked: response.data.blocked,
      categoryId: response.data.category.id,
    };
    return productDto;
  };

  const loadAllProduct = async (): Promise<Product[]> => {
    const url = `${resourceURL}`;
    const response: AxiosResponse<Product[]> = await httpClient.get(url);
    return response.data;
  };

  return {
    save,
    update,
    loadProduct,
    deleteProduct,
    loadAllProduct,
    loadProductDto,
  };
};
