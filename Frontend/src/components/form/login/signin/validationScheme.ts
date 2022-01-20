import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  email: Yup.string().email().trim().required('Campo obrigatório.'),
  password: Yup.string().required('Campo obrigatório.'),
});
