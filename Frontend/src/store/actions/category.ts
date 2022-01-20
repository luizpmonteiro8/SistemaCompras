import { Category } from 'app/models/category';
import { useCategoryService } from 'app/services';
import { SAVE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, LOAD_ALL_CATEGORY, IS_LOADING_CATEGORY } from './actionTypes';
import { messageError, messageSucess } from './../../components/common/toastr/index';

let returnValue = false;

export const SaveCategory = (category: Category) => {
  const categoryService = useCategoryService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await categoryService
      .save(category)
      .then((res) => {
        category.id = Number.parseInt(res.location.split('/')[4]);
        dispatch({ type: SAVE_CATEGORY, payload: category });
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

export const UpdateCategory = (category: Category) => {
  const categoryService = useCategoryService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await categoryService
      .update(category)
      .then(() => {
        dispatch({ type: UPDATE_CATEGORY, payload: category });
        messageSucess('Alterado com sucesso');
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

export const DeleteCategory = (id) => {
  const categoryService = useCategoryService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    categoryService
      .deleteCategory(id)
      .then(() => {
        dispatch({ type: DELETE_CATEGORY, payload: id });
      })
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
  };
};

export const LoadAllCategory = () => {
  const categoryService = useCategoryService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await categoryService
      .loadAllCategory()
      .then((res) => dispatch({ type: LOAD_ALL_CATEGORY, payload: res }))
      .catch((err) => {
        dispatch(isLoading(false));
        setError(err);
      });
    dispatch(isLoading(false));
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_CATEGORY, payload: value };
};

function setError(err) {
  if (String(err.message).includes('Network Error')) {
    messageError('Não foi possivel conectar com servidor.');
  } else {
    messageError(err.response.data.message);
  }
}
