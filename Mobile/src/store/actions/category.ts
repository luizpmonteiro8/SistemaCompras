/* eslint-disable @typescript-eslint/no-explicit-any */

import { Category } from '../../app/models/category';
import { useCategoryService } from '../../app/services';
import {
  SAVE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  LOAD_ALL_CATEGORY,
  IS_LOADING_CATEGORY,
} from './actionTypes';
import { setMessage } from './message';

let returnValue = false;

export const SaveCategory = (category: Category) => {
  const categoryService = useCategoryService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await categoryService
      .save(category)
      .then((res) => {
        category.id = Number.parseInt(res.location.split('/')[4]);
        dispatch({ type: SAVE_CATEGORY, payload: category });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const UpdateCategory = (category: Category) => {
  const categoryService = useCategoryService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await categoryService
      .update(category)
      .then(() => {
        dispatch({ type: UPDATE_CATEGORY, payload: category });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const DeleteCategory = (id: number) => {
  const categoryService = useCategoryService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    categoryService
      .deleteCategory(id)
      .then(() => {
        dispatch({ type: DELETE_CATEGORY, payload: id });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const LoadAllCategory = () => {
  const categoryService = useCategoryService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await categoryService
      .loadAllCategory()
      .then((res) => dispatch({ type: LOAD_ALL_CATEGORY, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        dispatch(setMessage(setError(err)));
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_CATEGORY, payload: value };
};

function setError(err: any) {
  if (String(err.message).includes('Network Error')) {
    return {
      title: 'Erro',
      text: 'Não foi possivel conectar com servidor.',
    };
  } else {
    return {
      title: 'Erro',
      text: err.response.data.message,
    };
  }
}
