import { httpClient } from '../http';
import { Category } from '../models/category';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

const resourceURL = '/categories';

export const useCategoryService = () => {
  const save = async (category: Category): Promise<AxiosRequestHeaders> => {
    const response: AxiosResponse<Category> = await httpClient.post<Category>(resourceURL, category);
    return response.headers;
  };

  const update = async (category: Category): Promise<void> => {
    const url = `${resourceURL}/${category.id}`;
    await httpClient.put<Category>(url, category);
  };

  const deleteCategory = async (id): Promise<void> => {
    const url = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const loadCategory = async (id): Promise<Category> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<Category> = await httpClient.get(url);
    return response.data;
  };

  const loadAllCategory = async (): Promise<Category[]> => {
    const url = `${resourceURL}`;
    const response: AxiosResponse<Category[]> = await httpClient.get(url);
    return response.data;
  };

  return {
    save,
    update,
    loadCategory,
    deleteCategory,
    loadAllCategory,
  };
};
