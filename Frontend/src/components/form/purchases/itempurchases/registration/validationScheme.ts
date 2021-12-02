import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  quantity: Yup.number().required('Campo obrigatório.').positive('Deve ser número positivo.'),
  price: Yup.number().required('Campo obrigatório.').positive('Deve ser número positivo.'),
  productId: Yup.number().required('Campo obrigatório.'),
});
