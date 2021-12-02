import { PurchasesDTO, itemPurchaseDTO } from 'app/models/purchasesDTO';
import { ItemPurchasesRegistration } from 'components';
import { useState, useEffect } from 'react';
import { PurchasesForm } from './form';
import * as Styled from './styles';
import { usePurchasesService } from 'app/services/purchases.service';
import { Cookies } from 'react-cookie';
import { mensagemErro, mensagemSucesso } from 'components/common/toastr';
import { useRouter } from 'next/dist/client/router';

export const PurchasesRegistration = () => {
  const [purchasesDTO, setPurchasesDTO] = useState<PurchasesDTO>({
    id: 0, //if 0 when submit create new purchases
    marketId: null,
    status: null,
    itemPurchaseDTOList: undefined,
  });
  const purchasesService = usePurchasesService();
  const router = useRouter();
  const { id } = router.query;
  const cookie = new Cookies();

  //loading purchases when have id in url
  useEffect(() => {
    if (typeof id !== 'undefined') {
      purchasesService
        .loadPurchasesDTO(id)
        .then((i) => {
          setPurchasesDTO(i);
          console.log();
        })
        .catch((e) => {
          mensagemErro(e.message);
        });
    }
  }, [id]);

  const changeStatus = () => {
    if (purchasesDTO.status === 'DELIVERED') {
      purchasesDTO.status = '2';
    }
    if (purchasesDTO.status === 'PENDING') {
      purchasesDTO.status = '1';
    }
  };

  const handleSubmit = (purchasesDTO: PurchasesDTO) => {
    //new purchases
    if (purchasesDTO.id === 0) {
      purchasesDTO.itemPurchaseDTOList = cookie.get('itemPurchases');
      if (purchasesDTO.itemPurchaseDTOList) {
        purchasesService
          .save(purchasesDTO)
          .then(() => {
            mensagemSucesso('Salvo com sucesso!');
            cookie.remove('itemPurchases', { path: '/' });
            router.push('/compras/lista?s=sucesso');
          })
          .catch((e) => {
            mensagemErro(e.errors);
            mensagemErro(e.message);
          });
      } else {
        mensagemErro('Nenhum item adicionado.');
      }
    } else {
      changeStatus();
      purchasesService
        .update(purchasesDTO)
        .then(() => {
          mensagemSucesso('Salvo com sucesso!');
          router.push('/compras/lista');
        })
        .catch((e) => {
          mensagemErro(e.errors);
          mensagemErro(e.message);
        });
    }
  };

  return (
    <Styled.Wrapper>
      <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
        <h4 className="card-header ">Compra</h4>
        <div className="card-body">
          {typeof purchasesDTO !== 'undefined' && <PurchasesForm purchasesDTO={purchasesDTO} onSubmit={handleSubmit} />}
        </div>
      </div>
      {typeof purchasesDTO !== 'undefined' && (
        <ItemPurchasesRegistration itemPurchasesLoad={purchasesDTO.itemPurchaseDTOList} />
      )}
    </Styled.Wrapper>
  );
};
