import { Input } from 'components/common/input';
import { AutoComplete } from 'components/common/autoComplete';
import { useFormik } from 'formik';
import { PurchasesDTO } from 'app/models/purchasesDTO';
import { Market } from 'app/models/market';
import { convertDataAutoComplete } from 'components/common/autoComplete/convertdata';
import { validationScheme } from './validationScheme';

export type PurchasesFormProps = {
  purchasesDTO: PurchasesDTO;
  market: Market[];
  onSubmit: (purchasesDTO: PurchasesDTO, { resetForm, setValues }) => void;
  removeCookie: () => void;
};

export const PurchasesForm = ({ purchasesDTO, market, onSubmit, removeCookie }: PurchasesFormProps) => {
  const formSchema = {
    id: undefined,
    status: 1,
    marketId: null,
    date: null,
  };

  const formik = useFormik<PurchasesDTO>({
    initialValues: { ...formSchema, ...purchasesDTO },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationScheme,
  });

  return (
    <form className="form-group" onSubmit={formik.handleSubmit}>
      <div>
        <div className="row m-2">
          <div className="col-md-12 ">
            <Input disabled id="id" name="id" onChange={formik.handleChange} value={formik.values.id} label="Id" />
          </div>
          <div className="col-md-12">
            {!!market && (
              <AutoComplete
                title="Mercado"
                id="market"
                placeholder="Selecione o mercado"
                data={convertDataAutoComplete(market)}
                onChange={(e) => {
                  if (e !== null) {
                    formik.setFieldValue('marketId', e.value);
                  } else {
                    formik.setFieldValue('marketId', 0);
                  }
                }}
                idValue={formik.values.marketId}
                error={formik.touched.marketId && formik.errors.marketId ? formik.errors.marketId : ''}
              />
            )}
          </div>
          <div className="col-md-6 ">
            <Input
              id="date"
              name="date"
              onChange={formik.handleChange}
              label="Data"
              type="date"
              value={String(formik.values.date)}
              error={formik.errors.date && formik.touched.date ? String(formik.errors.date) : ''}
            />
          </div>
          <div className="col-md-6">
            {!!market && (
              <AutoComplete
                title="Status"
                id="status"
                placeholder="Selecione o status"
                disabled={!!purchasesDTO.id && purchasesDTO.status === 'Entregue'}
                data={[
                  { value: 1, label: 'Em rota' },
                  { value: 2, label: 'Entregue' },
                ]}
                onChange={(e) => {
                  if (e !== null) {
                    formik.setFieldValue('status', e.label);
                  } else {
                    formik.setFieldValue('status', 0);
                  }
                }}
                idValue={formik.values.status === 'Entregue' ? 2 : 1}
              />
            )}
          </div>

          {formik.values.id === undefined || purchasesDTO.status === 'Em rota' ? (
            <div className="row justify-content-center mt-2">
              <div className="col-md-6	text-center ">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
                <a href="/" className="btn btn-danger ms-2">
                  Cancelar
                </a>
                <button type="button" onClick={removeCookie} className="btn btn-warning ms-2">
                  Resetar
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
};
