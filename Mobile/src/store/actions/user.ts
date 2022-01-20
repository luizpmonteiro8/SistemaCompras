/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
} from './actionTypes';
import { setMessage } from './message';
import jwt_decode from 'jwt-decode';
import { useUserService } from '../../app/services/user.service';
import { Credential, User } from '../../app/models/user';

export const userLogged = (credential: Credential) => {
  return {
    type: USER_LOGGED_IN,
    payload: credential,
  };
};

export const logout = () => {
  return {
    type: USER_LOGGED_OUT,
  };
};

export const loadingUser = () => {
  return {
    type: LOADING_USER,
  };
};

export const userLoaded = () => {
  return {
    type: USER_LOADED,
  };
};

export const CreateUser = (user: User) => {
  const userService = useUserService();
  return (dispatch: any) => {
    dispatch(loadingUser());
    userService
      .save(user)
      .then(() => {
        dispatch(userLoaded());
        dispatch(Login(user));
      })
      .catch(() => {
        dispatch(userLoaded());
        dispatch(
          setMessage({
            title: 'Erro',
            text: 'Ocorreu um erro inesperado!',
          }),
        );
      });
  };
};

export const Login = (user: User) => {
  const userService = useUserService();
  return (dispatch: any) => {
    dispatch(loadingUser());
    userService
      .login(user)
      .then((res) => {
        dispatch(userLoaded());
        dispatch(userLogged(claimsToken(res)));
      })
      .catch(() => {
        dispatch(userLoaded());
        dispatch(
          setMessage({
            title: 'Erro - Login',
            text: 'Ocorreu um erro inesperado!',
          }),
        );
      });
  };
};

type DecodeToke = {
  username: string;
  sub: string;
  exp: Date;
};

const claimsToken = (token: string) => {
  const decodedToken: DecodeToke = jwt_decode(token);
  if (decodedToken) {
    const credential: Credential = {
      name: decodedToken.username,
      email: String(decodedToken.sub),
      exp: decodedToken.exp,
      token: token,
    };
    return credential;
  }
  return { name: '', email: '', exp: new Date(), token: '' };
};
