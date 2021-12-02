import { useFormik } from 'formik';
import { Input } from 'components/common/input';
import { Category } from 'app/models/category';
import { validationScheme } from './validationScheme';

export type CategoryFormProps = {
  category: Category;
  onSubmit: (category: Category) => void;
};

const formSchema = {
  id: '',
  name: '',
};

export const CategoryForm = ({ category, onSubmit }: CategoryFormProps) => {
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
            {<Input disabled id="id" name="id" onChange={formik.handleChange} value={formik.values.id} label="Id" />}
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

          <div className="row justify-content-center mt-2">
            <div className="col-md-6  text-center ">
              <button type="submit" className="btn btn-primary">
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
