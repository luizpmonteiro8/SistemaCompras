import { PurchasesDTO, itemPurchaseDTO } from 'app/models/purchasesDTO';
import ItemPurchasesRegistration from '../itempurchases/registration/index';
import { useEffect } from 'react';
import { PurchasesForm } from './form';
import * as Styled from './styles';
import { Cookies } from 'react-cookie';
import { messageError, messageSucess } from 'components/common/toastr';
import { useRouter } from 'next/dist/client/router';
import { SavePurchases, UpdatePurchases, LoadAllPurchasesDTO } from 'store/actions/purchases';
import { LoadAllMarket } from 'store/actions/market';
import { connect, ConnectedProps } from 'react-redux';
import { Purchases } from 'app/models/purchases';
import { Market } from 'app/models/market';

type Props = PropsFromRedux;

const PurchasesRegistration = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const cookie = new Cookies();

  useEffect(() => {
    props.loadMarket();
    if (typeof id !== 'undefined') {
      try {
        props.loadPurchasesDTO(id);
      } catch (err) {
        messageError(err);
      }
    }
  }, [id]);

  const removeCookie = () => {
    cookie.get('itemPurchases');
    cookie.remove('itemPurchases', { path: '/' });
  };

  const changeStatus = (purchasesDTO) => {
    if (purchasesDTO.status === 'Entregue') {
      purchasesDTO.status = '2';
    }
    if (purchasesDTO.status === 'Em rota') {
      purchasesDTO.status = '1';
    }
  };

  const updateItemPurchasesFromPropsToLocalpurchasesDTO = (purchasesDTO: PurchasesDTO) => {
    purchasesDTO.itemPurchaseDTOList = props.purchasesUpdate.itemPurchaseDTOList;
    return purchasesDTO;
  };

  const handleSubmit = (purchasesDTO: PurchasesDTO, { resetForm, setValues }) => {
    changeStatus(purchasesDTO);
    try {
      if (purchasesDTO.id > 0) {
        const returnValue = props.updatePurchases(updateItemPurchasesFromPropsToLocalpurchasesDTO(purchasesDTO));
        if (returnValue) {
          router.push('/compras/lista');
          messageSucess('Alterado com sucesso!');
        }
      } else {
        purchasesDTO.itemPurchaseDTOList = cookie.get('itemPurchases');
        const returnValue = props.savePurchases(purchasesDTO);

        if (returnValue) {
          resetForm();
          removeCookie();
          router.push('/compras/lista');
          messageSucess('Salvo com sucesso.');
        }
      }
    } catch (err) {
      messageError(err);
    }
  };

  return (
    <Styled.Wrapper>
      <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
        <h4 className="card-header ">Compra</h4>
        <div className="card-body">
          {typeof props.purchasesDTO !== 'undefined' && (
            <PurchasesForm
              purchasesDTO={props.purchasesDTO}
              market={props.market}
              removeCookie={removeCookie}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
      {typeof props.purchasesDTO !== 'undefined' && <ItemPurchasesRegistration purchases={props.purchasesDTO} />}
    </Styled.Wrapper>
  );
};

const mapStateToProps = ({ market, purchases }) => {
  return {
    market: market.market as Market[],
    purchases: purchases.purchases as Purchases[],
    purchasesDTO: purchases.purchasesDTOSelect as PurchasesDTO,
    purchasesUpdate: purchases.purchasesUpdate as PurchasesDTO,
    isLoading: purchases.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    savePurchases: (Purchases: PurchasesDTO) => dispatch(SavePurchases(Purchases)),
    updatePurchases: (Purchases: PurchasesDTO) => dispatch(UpdatePurchases(Purchases)),
    loadPurchasesDTO: (id) => dispatch(LoadAllPurchasesDTO(id)),
    loadMarket: () => dispatch(LoadAllMarket()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PurchasesRegistration);
