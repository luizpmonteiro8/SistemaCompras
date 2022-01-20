import { useStockService } from 'app/services';
import { LOAD_ALL_STOCK, IS_LOADING_STOCK } from './actionTypes';
import { messageError } from './../../components/common/toastr/index';

export const LoadAllStock = () => {
  const stockService = useStockService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await stockService
      .loadAllStock()
      .then((res) => dispatch({ type: LOAD_ALL_STOCK, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_STOCK, payload: value };
};

function setError(err) {
  if (String(err.message).includes('Network Error')) {
    messageError('Não foi possivel conectar com servidor.');
  } else {
    messageError(err.response.data.message);
  }
}
