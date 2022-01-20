import { Input } from 'components/common/input';
import { AutoComplete, dataAutoComplete } from 'components/common/autoComplete';
import { useFormik } from 'formik';
import { EntraceExit } from 'app/models/entraceexit';
import { Product } from 'app/models/product';
import { Category } from 'app/models/category';
import { convertDataAutoComplete } from 'components/common/autoComplete/convertdata';
import { useState } from 'react';
import { validationScheme } from './validationScheme';
import { useRouter } from 'next/dist/client/router';

export type EntraceExitFormProps = {
  category: Category[];
  product: Product[];
  filterProductByCategory: (idCategory: number) => Product[];
  entraceExit: EntraceExit;
  onSubmit: (entraceExit: EntraceExit, { resetForm, setValues }) => void;
};

export const EntraceExitForm = ({
  category,
  product,
  filterProductByCategory,
  entraceExit,
  onSubmit,
}: EntraceExitFormProps) => {
  const formSchema = {
    id: '',
    productId: 0,
    quantity: 0,
    type: null,
    status: true,
  };

  const [categorySelected, setCategorySelected] = useState<dataAutoComplete>();
  const route = useRouter();
  const formik = useFormik<EntraceExit>({
    initialValues: { ...formSchema, ...entraceExit },
    onSubmit,
    validationSchema: validationScheme,
    enableReinitialize: true,
  });

  return (
    <form className="form-group" onSubmit={formik.handleSubmit} noValidate>
      <div>
        <div className="row m-2">
          <div className="col-md-6">
            <Input
              disabled
              id="id"
              name="id"
              onChange={formik.handleChange}
              value={formik.values.id == 0 ? '' : formik.values.id}
              label="Id"
              error={formik.errors.id}
            />
          </div>
        </div>
        <div className="row m-2">
          <div className="col-md-6">
            <AutoComplete
              title="Categoria"
              id="category"
              placeholder="Selecione categoria"
              data={convertDataAutoComplete(category)}
              onChange={(e) => setCategorySelected(e)}
              value={categorySelected}
            />
          </div>

          <div className="col-md-6">
            <AutoComplete
              title="Produto"
              id="type"
              placeholder="Selecione o produto"
              data={convertDataAutoComplete(
                filterProductByCategory(categorySelected?.value).length >= 1
                  ? filterProductByCategory(categorySelected?.value)
                  : product,
              )}
              onChange={(e) => {
                if (e != null) {
                  formik.setFieldValue('productId', e.value);
                } else {
                  formik.setFieldValue('productId', null);
                }
              }}
              idValue={formik.values.productId}
              error={formik.touched.productId && formik.errors.productId ? formik.errors.productId : ''}
            />
          </div>

          <div className="col-md-6 ">
            <Input
              id="quantity"
              name="quantity"
              onChange={(e) => formik.setFieldValue('quantity', e.target.value)}
              label="Quantidade"
              type="number"
              min="0.00"
              step="0.001"
              value={formik.values.quantity}
              error={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ''}
            />
          </div>

          <div className="col-md-6">
            <AutoComplete
              title="Entrada/Saida"
              id="type"
              placeholder="Selecione entrada ou saida"
              data={[
                { value: 0, label: 'Entrada' },
                { value: 1, label: 'Saida' },
              ]}
              onChange={(e: dataAutoComplete) => formik.setFieldValue('type', e.value)}
              idValue={formik.values.type}
              error={formik.touched.type && formik.errors.type ? formik.errors.type : ''}
            />
          </div>

          <div className="row justify-content-center mt-2">
            <div className="col-md-6	text-center ">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
              <a
                onClick={() => {
                  route.replace('/cadastros/entradasaida');
                  formik.resetForm();
                  formik.setValues({ id: 0, productId: 0, quantity: 0, type: null, status: true });
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
