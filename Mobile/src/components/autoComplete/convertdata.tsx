/* eslint-disable @typescript-eslint/no-explicit-any */

import { ItemType } from 'react-native-dropdown-picker';

export const convertDataAutoComplete = (
  data: any,
  addTodas?: boolean,
  addTodos?: boolean,
) => {
  if (!data) {
    return [{ value: 0, label: '' }] as ItemType[];
  }

  const result: ItemType[] = [];
  if (addTodas) {
    result.push({ value: 0, label: 'Todas' });
  }

  if (addTodos) {
    result.push({ value: 0, label: 'Todos' });
  }

  data.map((e: any) => {
    const dataAutoComplete: ItemType = { value: 0, label: '' };
    dataAutoComplete.value = e.id;
    dataAutoComplete.label = e.name;
    result.push(dataAutoComplete);
  });

  return result;
};
