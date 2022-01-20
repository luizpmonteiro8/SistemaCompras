import { SET_MESSAGE } from './actionTypes';

type Message = {
  title: string;
  text: string;
};

export const setMessage = (message: Message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};
