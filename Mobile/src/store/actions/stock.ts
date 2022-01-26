/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStockService } from '../../app/services';
import { LOAD_ALL_STOCK, IS_LOADING_STOCK } from './actionTypes';
import { setMessage } from './message';

export const LoadAllStock = () => {
  const stockService = useStockService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await stockService
      .loadAllStock()
      .then((res) => dispatch({ type: LOAD_ALL_STOCK, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_STOCK, payload: value };
};

function setError(err: any) {
  if (String(err.message).includes('Network Error')) {
    return {
      title: 'Erro',
      text: 'Não foi possivel conectar com servidor.',
    };
  } else {
    return {
      title: 'Erro',
      text: err.response.data.message,
    };
  }
}
