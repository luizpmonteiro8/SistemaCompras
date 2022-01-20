/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
} from '../actions/actionTypes';

const initialState = {
  name: null,
  email: null,
  isLoading: false,
  token: null,
  exp: null,
};

const reducer = (
  state = initialState,
  action: {
    type: any;
    payload: { name: any; email: any; token: any; exp: any };
  },
) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        exp: action.payload.exp,
      };
    case USER_LOGGED_OUT:
      return {
        ...initialState,
      };
    case LOADING_USER:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
