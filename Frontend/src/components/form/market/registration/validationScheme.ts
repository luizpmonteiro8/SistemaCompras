import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  name: Yup.string().trim().required('Campo obrigatório.'),
  blocked: Yup.boolean().required('Campo obrigatório.'),
  cnpj: Yup.number().nullable(true).min(14, 'Minimo de 14 caracteres').max(14, 'Maximo de 14 caracteres'),
});
