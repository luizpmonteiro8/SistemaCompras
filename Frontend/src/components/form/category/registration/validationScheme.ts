import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  name: Yup.string().trim().required('Campo obrigatório.'),
});
