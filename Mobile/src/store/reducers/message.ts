/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_MESSAGE } from '../actions/actionTypes';

const initialState = {
  title: '',
  text: '',
};

const reducer = (
  state = initialState,
  action: { type: any; payload: { title: any; text: any } },
) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        title: action.payload.title,
        text: action.payload.text,
      };
    default:
      return state;
  }
};

export default reducer;
