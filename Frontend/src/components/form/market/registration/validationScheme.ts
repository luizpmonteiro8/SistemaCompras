import { string } from 'prop-types';
import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  name: Yup.string().trim().required('Campo obrigatório.'),
  blocked: Yup.boolean().required('Campo obrigatório.'),
  cnpj: Yup.number()
    .notRequired()
    .nullable(true)
    .typeError('Campo obrigatório.')
    .test('len', 'Maximo de 14 caracteres', (val) => String(val).length <= 14)
    .test('len', 'Mínimo de 14 caracteres', (val) => val == null || String(val) == '' || String(val).length == 14),
});
