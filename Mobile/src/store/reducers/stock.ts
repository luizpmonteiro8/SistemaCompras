/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOAD_ALL_STOCK, IS_LOADING_STOCK } from '../actions/actionTypes';
import { Stock } from '../../app/models/stock';

const initialState = {
  stock: [] as Stock[],
  isLoading: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_ALL_STOCK:
      return {
        ...state,
        stock: action.payload,
      };
    case IS_LOADING_STOCK:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
