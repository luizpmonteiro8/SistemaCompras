import { Input } from 'components/common/input';
import { AutoComplete, dataAutoComplete } from 'components/common/autoComplete';
import { useFormik } from 'formik';
import { PurchasesDTO } from 'app/models/purchasesDTO';
import { Market } from 'app/models/market';
import { useEffect, useState } from 'react';
import { convertDataAutoComplete } from 'components/common/autoComplete/convertdata';
import { useMarketService } from 'app/services/market.service';
import { Cookies } from 'react-cookie';
import { mensagemErro } from './../../../common/toastr/index';
import { useRouter } from 'next/dist/client/router';
import { validationScheme } from './validationScheme';

export type PurchasesFormProps = {
  purchasesDTO: PurchasesDTO;
  onSubmit: (purchasesDTO: PurchasesDTO) => void;
};

export const PurchasesForm = ({ purchasesDTO, onSubmit }: PurchasesFormProps) => {
  const formSchema = {
    id: undefined,
  };
  const loading = false;
  const router = useRouter();

  const marketService = useMarketService();
  const [market, setMarket] = useState<Market[]>();
  const [marketSelected, setMarketSelected] = useState<dataAutoComplete>();
  const [statusSelected, setStatusSelected] = useState<dataAutoComplete>();

  const formik = useFormik<PurchasesDTO>({
    initialValues: { ...formSchema, ...purchasesDTO },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationScheme,
  });

  const removeCookie = () => {
    const cookie = new Cookies();
    cookie.get('itemPurchases');
    cookie.remove('itemPurchases', { path: '/' });
    router.reload();
  };

  // const handlesubmitForm = async () => {
  //  await formik.submitForm();
  //  if (formik.isValid && formik.errors) {
  //   formik.resetForm();
  //    setMarketSelected(null);
  //    setStatusSelected(null);
  //   }
  // };

  const loadingMarketStatus = () => {
    const marketSelectLoading = market.filter((i) => {
      return i.id === purchasesDTO.marketId;
    })[0];
    const dataMarket: dataAutoComplete = { value: marketSelectLoading.id, label: marketSelectLoading.name };
    const dataStatus =
      purchasesDTO.status === 'DELIVERED' ? { value: 2, label: 'Entregue' } : { value: 1, label: 'Em rota' };

    setMarketSelected(dataMarket);
    setStatusSelected(dataStatus);
  };

  useEffect(() => {
    marketService
      .loadAllMarket()
      .then((i) => {
        setMarket(i);
      })
      .catch((e) => {
        mensagemErro('Não foi possivel carregar mercados');
      });
  }, []);

  useEffect(() => {
    if (
      typeof purchasesDTO !== 'undefined' &&
      purchasesDTO.marketId &&
      purchasesDTO.status &&
      typeof market !== 'undefined'
    ) {
      loadingMarketStatus();
    }
  }, [market, purchasesDTO]);

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
                loading={loading}
                placeholder="Selecione o mercado"
                data={convertDataAutoComplete(market)}
                onChange={(e) => {
                  if (e !== null) {
                    formik.setFieldValue('marketId', e.value);
                  } else {
                    formik.setFieldValue('marketId', 0);
                  }
                  setMarketSelected(e);
                }}
                idValue={formik.values.marketId}
                //value={marketSelected}
              />
            )}
          </div>
          <div className="col-md-12 ">
            {formik.touched.marketId && formik.errors.marketId ? (
              <div className="text-danger">{formik.errors.marketId}</div>
            ) : (
              ''
            )}
          </div>

          <div className="col-md-12">
            {!!market && (
              <AutoComplete
                title="Status"
                id="status"
                loading={loading}
                placeholder="Selecione o status"
                data={[
                  { value: 1, label: 'Em rota' },
                  { value: 2, label: 'Entregue' },
                ]}
                onChange={(e) => {
                  if (e !== null) {
                    formik.setFieldValue('status', e.value);
                  } else {
                    formik.setFieldValue('status', 0);
                  }
                  setStatusSelected(e);
                }}
                value={statusSelected}
              />
            )}
          </div>
          <div className="col-md-12 ">
            {formik.touched.status && formik.errors.status ? (
              <div className="text-danger">{formik.errors.status}</div>
            ) : (
              ''
            )}
          </div>

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
        </div>
      </div>
    </form>
  );
};
