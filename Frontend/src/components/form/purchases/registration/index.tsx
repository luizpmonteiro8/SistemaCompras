import { itemPurchaseDTO, PurchasesDTO } from 'app/models/purchasesDTO';
import ItemPurchasesRegistration from '../itempurchases/registration/index';
import { useEffect } from 'react';
import { PurchasesForm } from './form';
import * as Styled from './styles';
import { messageError, messageSucess } from 'components/common/toastr';
import { useRouter } from 'next/dist/client/router';
import { SavePurchases, UpdatePurchases, LoadAllPurchasesDTO } from 'store/actions/purchases';
import { LoadAllMarket } from 'store/actions/market';
import { connect, ConnectedProps } from 'react-redux';
import { Purchases } from 'app/models/purchases';
import { Market } from 'app/models/market';
import { getItemCookie, removeItemCookie } from 'cookies/index';

type Props = PropsFromRedux;

const PurchasesRegistration = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

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

  const changeStatus = (purchasesDTO) => {
    if (purchasesDTO.status === 'Entregue') {
      purchasesDTO.status = '2';
    }
    if (purchasesDTO.status === 'Em rota') {
      purchasesDTO.status = '1';
    }
  };

  const handleSubmit = (purchasesDTO: PurchasesDTO, { resetForm }) => {
    changeStatus(purchasesDTO);
    try {
      if (purchasesDTO.id > 0) {
        if (props.purchasesUpdate.length >= 1) {
          purchasesDTO.itemPurchaseDTOList = props.purchasesUpdate;
        }

        if (props.updatePurchases(purchasesDTO)) {
          router.push('/compras/lista');
          messageSucess('Alterado com sucesso!');
        }
      } else {
        purchasesDTO.itemPurchaseDTOList = getItemCookie();
        if (typeof purchasesDTO.itemPurchaseDTOList != 'undefined') {
          if (props.savePurchases(purchasesDTO)) {
            resetForm();
            removeItemCookie();
            router.push('/compras/lista');
            messageSucess('Salvo com sucesso.');
          }
        } else {
          messageError('Adicione item a compra!');
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
              removeCookie={removeItemCookie}
              onSubmit={handleSubmit}
              isLoading={props.isLoading}
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
    purchasesUpdate: purchases.itemPurchasesUpdate as itemPurchaseDTO[],
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
