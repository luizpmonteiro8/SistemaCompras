import { useFormik } from 'formik';
import { Input } from 'components/common/input';
import { Market } from 'app/models/market';
import { validationScheme } from './validationScheme';
import { AutoComplete } from 'components/common/autoComplete';

export type MarketFormProps = {
  market: Market;
  onSubmit: (market: Market) => void;
};

const formSchema = {
  id: '',
  name: '',
  blocked: false,
  cnpj: '',
};

export const MarketForm = ({ market, onSubmit }: MarketFormProps) => {
  const formik = useFormik<Market>({
    initialValues: { ...formSchema, ...market },
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
          <div className="col-md-12 "></div>
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
              id="cnpj"
              name="cnpj"
              onChange={formik.handleChange}
              value={formik.values.cnpj}
              error={formik.touched.cnpj && formik.errors.cnpj ? formik.errors.cnpj : ''}
              label="CNPJ"
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
