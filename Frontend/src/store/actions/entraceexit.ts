import { EntraceExit } from 'app/models/entraceexit';
import { useEntraceExitService } from 'app/services';
import {
  SAVE_ENTRACEEXIT,
  UPDATE_ENTRACEEXIT,
  DELETE_ENTRACEEXIT,
  LOAD_ALL_ENTRACEEXIT,
  IS_LOADING_ENTRACEEXIT,
} from './actionTypes';
import { messageError, messageSucess } from './../../components/common/toastr/index';

let returnValue = false;

export const SaveEntraceExit = (entraceexit: EntraceExit) => {
  const entraceexitService = useEntraceExitService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await entraceexitService
      .save(entraceexit)
      .then((res) => {
        entraceexit.id = Number.parseInt(res.location.split('/')[4]);
        dispatch({ type: SAVE_ENTRACEEXIT, payload: entraceexit });
        messageSucess('Salvo com sucesso');
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const UpdateEntraceExit = (entraceexit: EntraceExit) => {
  const entraceexitService = useEntraceExitService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await entraceexitService
      .update(entraceexit)
      .then(() => {
        dispatch({ type: UPDATE_ENTRACEEXIT, payload: entraceexit });
        returnValue = true;
        messageSucess('Alterado com sucesso');
      })
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const DeleteEntraceExit = (id) => {
  const entraceexitService = useEntraceExitService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    entraceexitService
      .deleteEntraceExit(id)
      .then(() => {
        dispatch({ type: DELETE_ENTRACEEXIT, payload: id });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const LoadAllEntraceExit = () => {
  const entraceexitService = useEntraceExitService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await entraceexitService
      .loadAllEntraceExit()
      .then((res) => dispatch({ type: LOAD_ALL_ENTRACEEXIT, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_ENTRACEEXIT, payload: value };
};

function setError(err) {
  if (String(err.message).includes('Network Error')) {
    messageError('Não foi possivel conectar com servidor.');
  } else {
    messageError(err.response.data.message);
  }
}
