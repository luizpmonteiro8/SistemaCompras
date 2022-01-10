import { httpClient } from '../http';
import { EntraceExit } from '../models/entraceexit';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

const resourceURL = '/entraceexit';

export const useEntraceExitService = () => {
  const save = async (
    entraceexit: EntraceExit,
  ): Promise<AxiosRequestHeaders> => {
    const response: AxiosResponse<EntraceExit> =
      await httpClient.post<EntraceExit>(resourceURL, entraceexit);
    return response.headers;
  };

  const update = async (entraceexit: EntraceExit): Promise<void> => {
    const url = `${resourceURL}/${entraceexit.id}`;
    await httpClient.put<EntraceExit>(url, entraceexit);
  };

  const deleteEntraceExit = async (id: number): Promise<void> => {
    const url = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const loadEntraceExit = async (id: number): Promise<EntraceExit> => {
    const url = `${resourceURL}/${id}`;
    const response: AxiosResponse<EntraceExit> = await httpClient.get(url);
    return response.data;
  };

  const loadAllEntraceExit = async (): Promise<EntraceExit[]> => {
    const url = `${resourceURL}`;
    const response: AxiosResponse<EntraceExit[]> = await httpClient.get(url);
    return response.data;
  };

  return {
    save,
    update,
    loadEntraceExit,
    deleteEntraceExit,
    loadAllEntraceExit,
  };
};
