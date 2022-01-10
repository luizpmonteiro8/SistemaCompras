import { PurchasesDTO } from 'app/models/purchasesDTO';
import { usePurchasesService } from 'app/services';
import {
  SAVE_PURCHASES,
  UPDATE_PURCHASES,
  DELETE_PURCHASES,
  LOAD_ALL_PURCHASES,
  LOAD_PURCHASES_DTO,
  IS_LOADING_PURCHASES,
  ADD_ITEM_PURCHASES_UPDATE,
} from './actionTypes';

let returnValue = false;

export const SavePurchases = (purchasesDTO: PurchasesDTO) => {
  const purchasesService = usePurchasesService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await purchasesService
      .save(purchasesDTO)
      .then((res) => {
        purchasesDTO.id = Number.parseInt(res.location.split('/')[4]);
        dispatch({ type: SAVE_PURCHASES, payload: purchasesDTO });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          returnValue = false;
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          returnValue = false;
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const UpdatePurchases = (purchasesDTO: PurchasesDTO) => {
  const purchasesService = usePurchasesService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await purchasesService
      .update(purchasesDTO)
      .then(() => {
        dispatch({ type: UPDATE_PURCHASES, payload: purchasesDTO });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const DeletePurchases = (id) => {
  const purchasesService = usePurchasesService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    purchasesService
      .deletePurchases(id)
      .then(() => {
        dispatch({ type: DELETE_PURCHASES, payload: id });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const LoadAllPurchasesDTO = (id) => {
  const purchasesService = usePurchasesService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await purchasesService
      .loadPurchasesDTO(id)
      .then((res) => dispatch({ type: LOAD_PURCHASES_DTO, payload: res }))
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

export const LoadAllPurchases = () => {
  const purchasesService = usePurchasesService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await purchasesService
      .loadAllPurchases()
      .then((res) => dispatch({ type: LOAD_ALL_PURCHASES, payload: res }))
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

export const addItemPurchasesUpdate = (itemPurchasesUpdate) => {
  return { type: ADD_ITEM_PURCHASES_UPDATE, payload: itemPurchasesUpdate };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_PURCHASES, payload: value };
};
