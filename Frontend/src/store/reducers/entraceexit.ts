import {
  LOAD_ALL_ENTRACEEXIT,
  SAVE_ENTRACEEXIT,
  UPDATE_ENTRACEEXIT,
  DELETE_ENTRACEEXIT,
  IS_LOADING_ENTRACEEXIT,
} from '../actions/actionTypes';
import { EntraceExit } from 'app/models/entraceexit';

const initialState = {
  entraceExit: [] as EntraceExit[],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_ENTRACEEXIT:
      return {
        ...state,
        entraceExit: action.payload,
      };
    case SAVE_ENTRACEEXIT:
      return {
        ...state,
        entraceExit: state.entraceExit.concat(action.payload),
      };
    case UPDATE_ENTRACEEXIT:
      return {
        ...state,
        entraceexit: state.entraceExit.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        }),
      };
    case DELETE_ENTRACEEXIT:
      return {
        ...state,
        entraceExit: state.entraceExit.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
        }),
      };
    case IS_LOADING_ENTRACEEXIT:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
