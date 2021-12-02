import { useFormik } from 'formik';
import { Input } from 'components/common/input';
import { useCategoryService } from 'app/services/index';
import { Category } from 'app/models/category';
import { useEffect, useState } from 'react';
import { mensagemErro } from 'components';
import { itemPurchaseDTO } from 'app/models/purchasesDTO';
import { AutoComplete, dataAutoComplete } from 'components/common/autoComplete';
import { convertDataAutoComplete } from 'components/common/autoComplete/convertdata';
import { validationScheme } from './validationScheme';
import { Product } from 'app/models/product';
import { Console } from 'console';

export type ItemPurchasesFormProps = {
  itemPurchases: itemPurchaseDTO;
  product: Product[];
  onSubmit: (itemPurchases: itemPurchaseDTO) => void;
};

export const ItemPurchasesForm = ({ itemPurchases, product, onSubmit }: ItemPurchasesFormProps) => {
  let loading: boolean;

  const formSchema = {
    id: '',
    quantity: '',
    validaty: '',
    price: '',
    productId: '',
  };

  const [category, setCategory] = useState<Category[]>();

  const [dateValidaty, setDateValidaty] = useState<string>();
  const [categorySelected, setCategorySelected] = useState<dataAutoComplete>();
  const [productSelected, setProductSelected] = useState<dataAutoComplete>();
  const categoryService = useCategoryService();

  const formik = useFormik<itemPurchaseDTO>({
    initialValues: { ...formSchema, ...itemPurchases },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationScheme,
  });

  const CleanForm = () => {
    formik.resetForm();
    setCategorySelected(null);
    setProductSelected(null);
    setDateValidaty('dd/mm/aaaa');
    formik.setFieldValue('id', '');
    formik.setFieldValue('quantity', '');
    formik.setFieldValue('price', '');
    formik.setFieldValue('productId', '');
  };

  useEffect(() => {
    categoryService
      .loadAllCategory()
      .then((category) => {
        setCategory(category);
      })
      .catch((e) => {
        mensagemErro(e);
      });
  }, []);

  useEffect(() => {
    if (typeof itemPurchases !== 'undefined' && itemPurchases.id === 0.00553) {
      CleanForm();
    }
  }, [itemPurchases]);

  return (
    <form className="form-group" onSubmit={formik.handleSubmit}>
      <div>
        <div className="row m-2">
          <div className="col-md-12 ">
            {<Input disabled id="id" name="id" onChange={formik.handleChange} value={formik.values.id} label="Id" />}
          </div>

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
                data={convertDataAutoComplete(product)}
                onChange={(e) => {
                  if (e !== null) {
                    formik.setFieldValue('productId', e.value);
                  } else {
                    formik.setFieldValue('productId', '');
                  }

                  setProductSelected(e);
                }}
                value={productSelected}
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
              value={formik.values.quantity}
              error={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ''}
            />
          </div>
          <div className="col-md-6 ">
            <Input
              id="price"
              name="price"
              onChange={(e) => formik.setFieldValue('price', Number(e.target.value))}
              label="Preço"
              type="number"
              value={formik.values.price}
              error={formik.touched.price && formik.errors.price ? formik.errors.price : ''}
            />
          </div>

          <div className="col-md-6 ">
            <Input
              id="validaty"
              name="validaty"
              onChange={(e) => {
                const date = new Date(e.target.value);
                date.setHours(date.getHours() + 3);
                setDateValidaty(date.toISOString().slice(0, 10));
                formik.setFieldValue('validaty', date.toLocaleDateString('pt-BR'));
              }}
              label="Validade"
              type="date"
              value={dateValidaty}
              error={formik.errors.validaty}
            />
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-md-6  text-center ">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
              <a href="/" className="btn btn-danger ms-2">
                Cancelar
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
