import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  quantity: Yup.number()
    .required('Campo obrigatório.')
    .positive('Deve ser número positivo.')
    .typeError('Campo obrigatório.'),
  price: Yup.number()
    .required('Campo obrigatório.')
    .positive('Deve ser número positivo.')
    .typeError('Campo obrigatório.'),
  productId: Yup.number().required('Campo obrigatório.').typeError('Campo obrigatório.'),
});
