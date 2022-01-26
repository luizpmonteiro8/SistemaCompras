import { useFormik } from 'formik';
import { Input } from 'components/common/input';
import { Category } from 'app/models/category';
import { itemPurchaseDTO } from 'app/models/purchasesDTO';
import { AutoComplete, dataAutoComplete } from 'components/common/autoComplete';
import { convertDataAutoComplete } from 'components/common/autoComplete/convertdata';
import { validationScheme } from './validationScheme';
import { Product } from 'app/models/product';
import { useState } from 'react';

export type ItemPurchasesFormProps = {
  product: Product[];
  category: Category[];
  filterProductByCategory: (idCategory: number) => Product[];
  onSubmit: (itemPurchases: itemPurchaseDTO, { resetForm, setValues }) => void;
  isLoading: boolean;
};

export const ItemPurchasesForm = ({
  product,
  category,
  filterProductByCategory,
  onSubmit,
  isLoading,
}: ItemPurchasesFormProps) => {
  let loading: boolean;

  const formSchema = {
    id: 0,
    quantity: null,
    validaty: null,
    price: null,
    productId: null,
  };

  const [categorySelected, setCategorySelected] = useState<dataAutoComplete>();

  const formik = useFormik<itemPurchaseDTO>({
    initialValues: { ...formSchema },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationScheme,
  });

  return (
    <form className="form-group" onSubmit={formik.handleSubmit} noValidate>
      <div>
        <div className="row m-2">
          <div className="col-md-4 ">
            {!!category && (
              <AutoComplete
                title="Categoria"
                id="category"
                loading={loading}
                placeholder="Selecione a categoria"
                data={convertDataAutoComplete(category)}
                onChange={(e) => {
                  setCategorySelected(e);
                }}
                value={categorySelected}
              />
            )}
          </div>

          <div className="col-md-8 ">
            {!!product && (
              <AutoComplete
                title="Produto"
                id="productId"
                loading={loading}
                placeholder="Selecione um produto"
                data={convertDataAutoComplete(
                  filterProductByCategory(categorySelected?.value).length >= 1
                    ? filterProductByCategory(categorySelected?.value)
                    : product,
                )}
                onChange={(e) => {
                  if (e !== null) {
                    formik.setFieldValue('productId', e.value);
                  } else {
                    formik.setFieldValue('productId', '');
                  }
                }}
                idValue={formik.values.productId}
              />
            )}
          </div>
          <div className="offset-4 col-md-8 ">
            {formik.touched.productId && formik.errors.productId ? (
              <div className="text-danger">{formik.errors.productId}</div>
            ) : (
              ''
            )}
          </div>

          <div className="col-md-6 ">
            <Input
              id="quantity"
              name="quantity"
              onChange={(e) => formik.setFieldValue('quantity', e.target.value)}
              label="Quantidade"
              type="number"
              value={formik.values.quantity == null ? '' : formik.values.quantity}
              error={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ''}
            />
          </div>
          <div className="col-md-6 ">
            <Input
              id="price"
              name="price"
              onChange={(e) => formik.setFieldValue('price', e.target.value)}
              label="Preço"
              type="number"
              value={formik.values.price == null ? '' : formik.values.price}
              error={formik.touched.price && formik.errors.price ? formik.errors.price : ''}
            />
          </div>

          <div className="col-md-6 ">
            <Input
              id="validaty"
              name="validaty"
              onChange={formik.handleChange}
              label="Validade"
              type="date"
              value={formik.values.validaty ? String(formik.values.validaty) : null}
              error={formik.touched.validaty && formik.errors.validaty ? String(formik.errors.validaty) : null}
            />
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-md-6  text-center ">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                Enviar
              </button>
              <a
                onClick={() => {
                  formik.resetForm();
                  formik.setValues({ ...formSchema });
                }}
                className="btn btn-danger ms-2"
              >
                Limpar
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
