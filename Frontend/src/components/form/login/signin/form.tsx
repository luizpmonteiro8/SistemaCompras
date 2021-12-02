import { useFormik, FieldArray, Field } from 'formik';
import { Input } from 'components/common/input';
import { useEffect, useRef, useState } from 'react';
import { Credential } from 'app/models/user';

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
            <Input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} label="Email" />
          </div>
          <div className="col-md-12 ">
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              label="Senha"
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
