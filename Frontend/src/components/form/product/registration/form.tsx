import { useFormik } from 'formik';
import { Input } from 'components/common/input';
import { Product } from 'app/models/product';
import { validationScheme } from './validationScheme';
import { useCategoryService } from 'app/services/index';
import { Category } from 'app/models/category';
import { useEffect, useLayoutEffect, useState } from 'react';
import { mensagemErro } from 'components';
import { ProductDTO } from 'app/models/productDTO';

export type ProductFormProps = {
  product: ProductDTO;
  onSubmit: (product: ProductDTO) => void;
};

const formSchema = {
  id: '',
  name: '',
  blocked: false,
  categoryId: null,
};

export const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [category, setCategory] = useState<Category[]>();
  const categoryService = useCategoryService();
  const [categoryValue, setCategoryValue] = useState<number>();

  const formik = useFormik<ProductDTO>({
    initialValues: { ...formSchema, ...product },
    onSubmit,
    validationSchema: validationScheme,
    enableReinitialize: true,
  });

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

  return (
    <form className="form-group" onSubmit={formik.handleSubmit}>
      <div>
        <div className="row m-2">
          <div className="col-md-12 ">
            {<Input disabled id="id" name="id" onChange={formik.handleChange} value={formik.values.id} label="Id" />}
          </div>

          <div className="col-md-12 ">
            <label className="form-label ">Categoria</label>
            <select
              id="categoryId"
              className="form-select "
              onChange={formik.handleChange}
              value={formik.values.categoryId}
            >
              <option>Seleciona a categoria do produto...</option>
              {!!category &&
                category.map((category, index) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-md-12 ">
            <Input
              autoFocus={true}
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
              autoFocus={true}
              id="quantMin"
              name="quantMin"
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
