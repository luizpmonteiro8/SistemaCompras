import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  productId: Yup.number().required('Campo obrigatório.').typeError('Campo obrigatório.').positive('Campo obrigatório.'),
  quantity: Yup.number().required('Campo obrigatório.').typeError('Campo obrigatório.').positive('Campo obrigatório.'),
  type: Yup.number().required('Campo obrigatório.').typeError('Campo obrigatório.'),
});
