import { dataAutoComplete } from 'components/common/autoComplete';

export const convertDataAutoComplete = (data, addTodas?: boolean, addTodos?: boolean) => {
  if (!data) {
    return null;
  }

  const result: dataAutoComplete[] = [];
  if (addTodas) {
    result.push({ value: 0, label: 'Todas' });
  }

  if (addTodos) {
    result.push({ value: 0, label: 'Todos' });
  }

  data.map((e) => {
    const dataAutoComplete: dataAutoComplete = { value: 0, label: '' };
    dataAutoComplete.value = e.id;
    dataAutoComplete.label = e.name;
    result.push(dataAutoComplete);
  });

  return result;
};
