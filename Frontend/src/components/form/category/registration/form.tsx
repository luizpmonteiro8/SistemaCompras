import { useFormik } from 'formik';
import { Input } from 'components/common/input';
import { Category } from 'app/models/category';
import { validationScheme } from './validationScheme';

export type CategoryFormProps = {
  category: Category;
  onSubmit: (category: Category, { resetForm, setValues }) => void;
  isLoading: boolean;
};

const formSchema = {
  id: '',
  name: '',
};

export const CategoryForm = ({ category, onSubmit, isLoading }: CategoryFormProps) => {
  const formik = useFormik<Category>({
    initialValues: { ...formSchema, ...category },
    onSubmit,
    validationSchema: validationScheme,
    enableReinitialize: true,
  });

  return (
    <form className="form-group" onSubmit={formik.handleSubmit}>
      <div>
        <div className="row m-2">
          <div className="col-md-12 ">
            {
              <Input
                disabled={true}
                id="id"
                name="id"
                onChange={formik.handleChange}
                value={formik.values.id}
                label="Id"
              />
            }
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

          <div className="row justify-content-center mt-2">
            <div className="col-md-6  text-center ">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                Enviar
              </button>
              <a href={'/cadastros/categorias'} className="btn btn-danger ms-2">
                Limpar
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
