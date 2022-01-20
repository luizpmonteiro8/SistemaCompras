import {
  LOAD_ALL_PURCHASES,
  LOAD_PURCHASES_DTO,
  SAVE_PURCHASES,
  UPDATE_PURCHASES,
  DELETE_PURCHASES,
  IS_LOADING_PURCHASES,
  ADD_ITEM_PURCHASES_UPDATE,
} from '../actions/actionTypes';
import { Purchases } from 'app/models/purchases';
import { PurchasesDTO, itemPurchaseDTO } from 'app/models/purchasesDTO';

const initialState = {
  purchases: [] as Purchases[],
  purchasesDTOSelect: {} as PurchasesDTO,
  itemPurchasesUpdate: [] as itemPurchaseDTO[],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_PURCHASES:
      return {
        ...state,
        purchases: action.payload,
      };
    case LOAD_PURCHASES_DTO:
      return {
        ...state,
        purchasesDTOSelect: action.payload,
      };
    case SAVE_PURCHASES:
      return {
        ...state,
        purchases: state.purchases.concat(action.payload),
      };
    case ADD_ITEM_PURCHASES_UPDATE:
      return {
        ...state,
        itemPurchasesUpdate: action.payload as itemPurchaseDTO[],
      };
    case UPDATE_PURCHASES:
      return {
        ...state,
        purchases: state.purchases.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        }),
      };
    case DELETE_PURCHASES:
      return {
        ...state,
        purchases: state.purchases.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
        }),
      };
    case IS_LOADING_PURCHASES:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
