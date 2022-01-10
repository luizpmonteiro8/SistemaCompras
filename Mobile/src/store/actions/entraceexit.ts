/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntraceExit } from '../../app/models/entraceexit';
import { useEntraceExitService } from '../../app/services';
import {
  SAVE_ENTRACEEXIT,
  UPDATE_ENTRACEEXIT,
  DELETE_ENTRACEEXIT,
  LOAD_ALL_ENTRACEEXIT,
  IS_LOADING_ENTRACEEXIT,
} from './actionTypes';

let returnValue = false;

export const SaveEntraceExit = (entraceexit: EntraceExit) => {
  const entraceexitService = useEntraceExitService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await entraceexitService
      .save(entraceexit)
      .then((res) => {
        entraceexit.id = Number.parseInt(res.location.split('/')[4]);
        dispatch({ type: SAVE_ENTRACEEXIT, payload: entraceexit });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const UpdateEntraceExit = (entraceexit: EntraceExit) => {
  const entraceexitService = useEntraceExitService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await entraceexitService
      .update(entraceexit)
      .then(() => {
        dispatch({ type: UPDATE_ENTRACEEXIT, payload: entraceexit });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const DeleteEntraceExit = (id: any) => {
  const entraceexitService = useEntraceExitService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    entraceexitService
      .deleteEntraceExit(id)
      .then(() => {
        dispatch({ type: DELETE_ENTRACEEXIT, payload: id });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const LoadAllEntraceExit = () => {
  const entraceexitService = useEntraceExitService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await entraceexitService
      .loadAllEntraceExit()
      .then((res) => dispatch({ type: LOAD_ALL_ENTRACEEXIT, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_ENTRACEEXIT, payload: value };
};
