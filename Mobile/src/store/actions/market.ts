/* eslint-disable @typescript-eslint/no-explicit-any */
import { Market } from '../../app/models/market';
import { useMarketService } from '../../app/services';
import {
  SAVE_MARKET,
  UPDATE_MARKET,
  DELETE_MARKET,
  LOAD_ALL_MARKET,
  IS_LOADING_MARKET,
} from './actionTypes';
import { setMessage } from './message';

let returnValue = false;

export const SaveMarket = (market: Market) => {
  const marketService = useMarketService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await marketService
      .save(market)
      .then((res) => {
        market.id = Number.parseInt(res.location.split('/')[4]);
        dispatch({ type: SAVE_MARKET, payload: market });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const UpdateMarket = (market: Market) => {
  const marketService = useMarketService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await marketService
      .update(market)
      .then(() => {
        dispatch({ type: UPDATE_MARKET, payload: market });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const DeleteMarket = (id: number) => {
  const marketService = useMarketService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    marketService
      .deleteMarket(id)
      .then(() => {
        dispatch({ type: DELETE_MARKET, payload: id });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const LoadAllMarket = () => {
  const marketService = useMarketService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await marketService
      .loadAllMarket()
      .then((res) => dispatch({ type: LOAD_ALL_MARKET, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_MARKET, payload: value };
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
