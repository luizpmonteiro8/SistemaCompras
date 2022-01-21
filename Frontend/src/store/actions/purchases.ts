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
import { messageError, messageSucess } from './../../components/common/toastr/index';
import { Purchases } from 'app/models/purchases';
import storeConfig from 'store/storeConfig';
import { Market } from 'app/models/market';

let returnValue = false;

export const SavePurchases = (purchasesDTO: PurchasesDTO) => {
  const purchasesService = usePurchasesService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await purchasesService
      .save(purchasesDTO)
      .then((res) => {
        purchasesDTO.id = Number.parseInt(res.location.split('/')[4]);
        const purchases = convertDtoToPurchases(purchasesDTO);
        dispatch({ type: SAVE_PURCHASES, payload: purchases });
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

export const UpdatePurchases = (purchasesDTO: PurchasesDTO) => {
  const purchasesService = usePurchasesService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await purchasesService
      .update(purchasesDTO)
      .then(() => {
        dispatch({ type: UPDATE_PURCHASES, payload: purchasesDTO });
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
        setError(err);
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
        setError(err);
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
        setError(err);
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

function setError(err) {
  if (String(err.message).includes('Network Error')) {
    messageError('Não foi possivel conectar com servidor.');
  } else {
    messageError(err.response.data.message);
  }
}

function convertDtoToPurchases(purchaseDTO: PurchasesDTO) {
  const market: Market[] = storeConfig.getState().market.market;
  const marketSelected = market.filter((item) => {
    if (item.id == purchaseDTO.marketId) return item;
  })[0];
  const status = purchaseDTO.status == '1' ? 'Em rota' : 'Entregue';
  const total = purchaseDTO.itemPurchaseDTOList.reduce((total, item) => total + item.quantity * item.quantity, 0);

  const purchase: Purchases = {
    id: purchaseDTO.id,
    date: purchaseDTO.date,
    market: marketSelected,
    status,
    itemPurchaseList: [],
    total,
  };
  return purchase;
}
