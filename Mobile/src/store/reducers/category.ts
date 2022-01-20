/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '../../app/models/category';
import {
  LOAD_ALL_CATEGORY,
  SAVE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  IS_LOADING_CATEGORY,
} from '../actions/actionTypes';

const initialState = {
  category: [] as Category[],
  isLoading: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_ALL_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case SAVE_CATEGORY:
      return {
        ...state,
        category: state.category.concat(action.payload),
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: state.category.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        }),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
        }),
      };
    case IS_LOADING_CATEGORY:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
