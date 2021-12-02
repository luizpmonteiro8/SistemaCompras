import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  marketId: Yup.number().required('Campo obrigatório.').typeError('Campo obrigatório.').positive('Campo obrigatório.'),
  status: Yup.number().required('Campo obrigatório.').typeError('Campo obrigatório.').positive('Campo obrigatório.'),
});
