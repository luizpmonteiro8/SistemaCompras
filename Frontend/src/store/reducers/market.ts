import { LOAD_ALL_MARKET, SAVE_MARKET, UPDATE_MARKET, DELETE_MARKET, IS_LOADING_MARKET } from '../actions/actionTypes';
import { Market } from 'app/models/market';

const initialState = {
  market: [] as Market[],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_MARKET:
      return {
        ...state,
        market: action.payload,
      };
    case SAVE_MARKET:
      return {
        ...state,
        market: state.market.concat(action.payload),
      };
    case UPDATE_MARKET:
      return {
        ...state,
        market: state.market.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        }),
      };
    case DELETE_MARKET:
      return {
        ...state,
        market: state.market.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
        }),
      };
    case IS_LOADING_MARKET:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
