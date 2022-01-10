import { ProductDTO } from 'app/models/productDTO';
import { useProductService } from 'app/services';
import {
  SAVE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  LOAD_ALL_PRODUCT,
  LOAD_PRODUCT_DTO,
  IS_LOADING_PRODUCT,
} from './actionTypes';
import storeConfig from 'store/storeConfig';
import { Product } from 'app/models/product';

let returnValue = false;

export const SaveProduct = (productDTO: ProductDTO) => {
  const productService = useProductService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await productService
      .save(productDTO)
      .then((res) => {
        productDTO.id = Number.parseInt(res.location.split('/')[4]);
        const product = DTOFromProduct(productDTO);
        dispatch({ type: SAVE_PRODUCT, payload: product });
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

export const UpdateProduct = (productDTO: ProductDTO) => {
  const productService = useProductService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await productService
      .update(productDTO)
      .then(() => {
        const product = DTOFromProduct(productDTO);
        dispatch({ type: UPDATE_PRODUCT, payload: product });
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

export const DeleteProduct = (id) => {
  const productService = useProductService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    productService
      .deleteProduct(id)
      .then(() => {
        dispatch({ type: DELETE_PRODUCT, payload: id });
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

export const LoadAllProductDTO = (id) => {
  const productService = useProductService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await productService
      .loadProductDto(id)
      .then((res) => dispatch({ type: LOAD_PRODUCT_DTO, payload: res }))
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

export const LoadAllProduct = () => {
  const productService = useProductService();
  return async (dispatch) => {
    dispatch(isLoading(true));
    await productService
      .loadAllProduct()
      .then((res) => {
        dispatch({ type: LOAD_ALL_PRODUCT, payload: res });
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
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_PRODUCT, payload: value };
};

const DTOFromProduct = (productDTO: ProductDTO): Product => {
  const category = storeConfig.getState().category.category.filter((item) => {
    if (item.id === productDTO.categoryId) {
      return item;
    }
  });
  const product: Product = {
    id: productDTO.id,
    name: productDTO.name,
    blocked: productDTO.blocked,
    quantMin: productDTO.quantMin,
    category: category[0],
  };

  return product;
};
