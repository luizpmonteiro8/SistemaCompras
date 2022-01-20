import { useFormik } from 'formik';
import { Input } from 'components/common/input';
import { validationScheme } from './validationScheme';
import { Category } from 'app/models/category';
import { useState } from 'react';
import { ProductDTO } from 'app/models/productDTO';
import { AutoComplete } from 'components/common/autoComplete';
import { convertDataAutoComplete } from 'components/common/autoComplete/convertdata';
import { useRouter } from 'next/dist/client/router';

export type ProductFormProps = {
  product: ProductDTO;
  onSubmit: (product: ProductDTO, { resetForm, setValues }) => void;
  category: Category[];
};

const formSchema = {
  id: '',
  name: '',
  quantMin: '',
  blocked: false,
  categoryId: null,
};

export const ProductForm = ({ product, onSubmit, category }: ProductFormProps) => {
  const route = useRouter();
  const formik = useFormik<ProductDTO>({
    initialValues: { ...formSchema, ...product },
    onSubmit,
    validationSchema: validationScheme,
    enableReinitialize: true,
  });

  return (
    <form className="form-group" onSubmit={formik.handleSubmit}>
      <div>
        <div className="row m-2">
          <div className="col-md-12 ">
            {<Input disabled id="id" name="id" onChange={formik.handleChange} value={formik.values.id} label="Id" />}
          </div>

          <div className="col-md-12 ">
            <AutoComplete
              title="Categoria"
              id="categoryId"
              loading={false}
              placeholder="Selecione a categoria"
              data={convertDataAutoComplete(category)}
              onChange={(e) => {
                e !== null ? formik.setFieldValue('categoryId', e.value) : formik.setFieldValue('categoryId', null);
              }}
              idValue={formik.values.categoryId}
              error={formik.touched.categoryId && formik.errors.categoryId ? formik.errors.categoryId : ''}
            />
          </div>

          <div className="col-md-12 ">
            <Input
              autoFocusValue={true}
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
              label="Nome"
            />
          </div>

          <div className="col-md-12 ">
            <Input
              id="quantMin"
              name="quantMin"
              type="number"
              min="0.00"
              step="0.001"
              onChange={formik.handleChange}
              value={formik.values.quantMin}
              error={formik.touched.quantMin && formik.errors.quantMin ? formik.errors.quantMin : ''}
              label="Quantidade mínima"
            />
          </div>

          <div className="col-md-12 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="blocked"
              onChange={formik.handleChange}
              defaultChecked={formik.values.blocked ? true : false}
            />
            <label className="form-check-label" htmlFor="blocked">
              Bloqueado
            </label>
          </div>

          <div className="row justify-content-center mt-2">
            <div className="col-md-6  text-center ">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
              <a
                onClick={() => {
                  route.replace('/cadastros/produtos');
                  formik.resetForm();
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
