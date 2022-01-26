import { httpClient } from '../http';
import { EmailDTO, User } from '../models/user';
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios';

const resourceURL = '/users';

export const useUserService = () => {
  const save = async (user: User): Promise<User> => {
    const response: AxiosResponse<User> = await httpClient.post<User>(
      resourceURL,
      user,
    );
    return response.data;
  };

  const update = async (user: User): Promise<void> => {
    const url = '${resourceURL}/${user.id}';
    await httpClient.put<User>(url, user);
  };

  const deleteUser = async (id: number): Promise<void> => {
    const url = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const loadUser = async (id: number): Promise<User> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<User> = await httpClient.get(url);
    return response.data;
  };

  const login = async (user: User): Promise<string> => {
    const url = 'http://192.168.1.10:8080/login';
    const response: AxiosResponseHeaders = await (
      await axios.post(url, { email: user.email, password: user.password })
    ).headers;
    return response.authorization;
  };

  const forgotPassword = async (emailDTO: EmailDTO): Promise<void> => {
    const url = 'http://192.168.1.10:8080/auth/forgot';
    await axios.post(url, emailDTO);
  };

  return {
    save,
    update,
    loadUser,
    deleteUser,
    login,
    forgotPassword,
  };
};
