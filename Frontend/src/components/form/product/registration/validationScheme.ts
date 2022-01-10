import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  name: Yup.string().trim().required('Campo obrigatório.'),
  blocked: Yup.boolean().required('Campo obrigatório.'),
  categoryId: Yup.number().required('Campo obrigatório.').typeError('Campo obrigatório.'),
});
