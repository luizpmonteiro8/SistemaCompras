/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDTO } from '../../app/models/productDTO';
import { Product } from '../../app/models/product';
import {
  LOAD_ALL_PRODUCT,
  SAVE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  IS_LOADING_PRODUCT,
  LOAD_PRODUCT_DTO,
} from '../actions/actionTypes';

const initialState = {
  product: [] as Product[],
  productDTO: {} as ProductDTO,
  isLoading: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_ALL_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case LOAD_PRODUCT_DTO:
      return {
        ...state,
        productDTO: action.payload,
      };
    case SAVE_PRODUCT:
      return {
        ...state,
        product: state.product.concat(action.payload),
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        }),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product: state.product.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
        }),
      };
    case IS_LOADING_PRODUCT:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
