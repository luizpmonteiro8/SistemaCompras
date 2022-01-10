import { useStockService } from 'app/services';
import { LOAD_ALL_STOCK, IS_LOADING_STOCK } from './actionTypes';

export const LoadAllStock = () => {
  const stockService = useStockService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await stockService
      .loadAllStock()
      .then((res) => dispatch({ type: LOAD_ALL_STOCK, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_STOCK, payload: value };
};
