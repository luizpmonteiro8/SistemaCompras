import { Market } from 'app/models/market';
import { useMarketService } from 'app/services';
import { SAVE_MARKET, UPDATE_MARKET, DELETE_MARKET, LOAD_ALL_MARKET, IS_LOADING_MARKET } from './actionTypes';
import { messageError, messageSucess } from './../../components/common/toastr/index';

let returnValue = false;

export const SaveMarket = (market: Market) => {
  const marketService = useMarketService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await marketService
      .save(market)
      .then((res) => {
        market.id = Number.parseInt(res.location.split('/')[4]);
        dispatch({ type: SAVE_MARKET, payload: market });
        messageSucess('Salvo com sucesso');
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const UpdateMarket = (market: Market) => {
  const marketService = useMarketService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await marketService
      .update(market)
      .then(() => {
        dispatch({ type: UPDATE_MARKET, payload: market });
        messageSucess('Alterado com sucesso');
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const DeleteMarket = (id) => {
  const marketService = useMarketService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    marketService
      .deleteMarket(id)
      .then(() => {
        dispatch({ type: DELETE_MARKET, payload: id });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const LoadAllMarket = () => {
  const marketService = useMarketService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await marketService
      .loadAllMarket()
      .then((res) => dispatch({ type: LOAD_ALL_MARKET, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_MARKET, payload: value };
};

function setError(err) {
  if (String(err.message).includes('Network Error')) {
    messageError('Não foi possivel conectar com servidor.');
  } else {
    messageError(err.response.data.message);
  }
}
