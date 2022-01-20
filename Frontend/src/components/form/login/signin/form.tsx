import { useFormik } from 'formik';
import { Input, InputPassword } from 'components/common/input';
import { useEffect } from 'react';
import { Credential } from 'app/models/user';
import { validationScheme } from './validationScheme';

export type LoginFormProps = {
  onSubmit: (credential: Credential) => void;
};

const formSchema = {
  email: '',
  password: '',
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formik = useFormik<Credential>({
    initialValues: { ...formSchema },
    onSubmit,
    validationSchema: validationScheme,
  });

  useEffect(() => {
    return null;
  }),
    [];

  return (
    <form className="form-group" onSubmit={formik.handleSubmit}>
      <div>
        <div className="row m-2">
          <div className="col-md-12 ">
            <Input
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              label="Email"
              error={formik.touched.email ? formik.errors.email : ''}
            />
          </div>
          <div className=" col-md-12 ">
            <InputPassword
              id="password"
              label="Senha"
              onChange={formik.handleChange}
              name="password"
              value={formik.values.password}
              error={formik.touched.password ? formik.errors.password : ''}
            />
            <div className="row justify-content-center mt-2">
              <div className="col-md-6  text-center ">
                <button type="submit" className="btn btn-primary">
                  Entrar
                </button>
                <a className="btn btn-danger ms-2" href="/cadastros/usuario">
                  Cadastrar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
