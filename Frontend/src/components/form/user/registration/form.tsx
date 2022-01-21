import { useFormik, FieldArray, Field } from 'formik';
import { Input } from 'components/common/input';
import { useEffect, useRef, useState } from 'react';
import { User } from 'app/models/user';
import { validationScheme } from './validationScheme';

export type UserFormProps = {
  user: User;
  onSubmit: (user: User) => void;
};

const formSchema = {
  name: '',
  email: '',
  password: '',
};

export const UserForm = ({ user, onSubmit }: UserFormProps) => {
  const formik = useFormik<User>({
    initialValues: { ...formSchema, ...user },
    onSubmit,
    validationSchema: validationScheme,
  });

  return (
    <form className="form-group" onSubmit={formik.handleSubmit}>
      <div>
        <div className="row m-2">
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
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
              label="Email"
            />
          </div>
          <div className="col-md-12 ">
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
              label="Senha"
            />
            <div className="row justify-content-center mt-2">
              <div className="col-md-6  text-center ">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
                <a href="/" className="btn btn-danger ms-2">
                  Página inicial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
