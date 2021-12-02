import { httpClient } from '../http';
import { Credential } from '../models/user';
import { User } from '../models/user';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { mensagemErro } from 'components';

const resourceURL = '/users';

export const useUserService = () => {
  const save = async (user: User): Promise<User> => {
    const response: AxiosResponse<User> = await httpClient.post<User>(resourceURL, user);
    return response.data;
  };

  const update = async (user: User): Promise<void> => {
    const url = '${resourceURL}/${user.id}';
    await httpClient.put<User>(url, user);
  };

  const deleteUser = async (id): Promise<void> => {
    const url = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const loadUser = async (id): Promise<User> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<User> = await httpClient.get(url);
    return response.data;
  };

  return {
    save,
    update,
    loadUser,
    deleteUser,
  };
};
