import * as Styled from './styles';
import { useState, useEffect } from 'react';
import { usePurchasesService, useProductService } from 'app/services';
import { ItemPurchasesForm } from './form';
import { mensagemErro, mensagemSucesso } from 'components';
import { itemPurchaseDTO } from 'app/models/purchasesDTO';
import { ItemPurchaseDTOListing } from 'components';
import { useCookies } from 'react-cookie';
import { Product } from 'app/models/product';
import { useRouter } from 'next/dist/client/router';

type props = {
  itemPurchasesLoad: itemPurchaseDTO[];
};

export const ItemPurchasesRegistration = ({ itemPurchasesLoad }: props) => {
  const [loading, setLoading] = useState<boolean>();
  const [product, setProduct] = useState<Product[]>();
  const productService = useProductService();
  const [itemPurchasesArray, setItemPurchasesArray] = useState<itemPurchaseDTO[]>([]);
  const [itemPurchases, setItemPurchases] = useState<itemPurchaseDTO>();

  const router = useRouter();
  const { id } = router.query;

  const [itemPurchasesCookie, setItemPurchasesCookie, removeItemPurchasesCookie] = useCookies(['itemPurchases']);
  let idTemp = null;

  if (itemPurchasesArray) {
    idTemp = itemPurchasesArray.length;
  }

  useEffect(() => {
    productService
      .loadAllProduct()
      .then((product) => {
        setProduct(product);
      })
      .catch((e) => {
        mensagemErro(e);
      });

    //have cookie
    if (typeof itemPurchasesCookie.itemPurchases !== 'undefined') {
      setItemPurchasesArray(itemPurchasesCookie.itemPurchases);
    }
    //new purchases
    if (typeof itemPurchasesLoad !== 'undefined') {
      setItemPurchasesArray(itemPurchasesLoad);
    }
  }, [itemPurchasesLoad]);

  const handleSubmit = (itemPurchases: itemPurchaseDTO) => {
    try {
      itemPurchases.id = idTemp + 1;
      setItemPurchasesArray((i) => [...i, itemPurchases]);
      if (!id) {
        saveCookie(itemPurchases);
      }
      mensagemSucesso('Item adicionado');
      setItemPurchases({ id: 0.00553, quantity: null, validaty: null, price: null, productId: null });
    } catch (e) {
      mensagemErro('Erro ao adicionar item');
    }
  };

  //fix itemPurchasesArray with minus last item
  const saveCookie = (itemPurchases) => {
    const arrayCookie = itemPurchasesArray;
    arrayCookie.push(itemPurchases);
    setItemPurchasesCookie('itemPurchases', arrayCookie, {
      path: '/',
      expires: dateExpiration(),
    });
  };

  //sum 15 day date expires to cookie
  const dateExpiration = () => {
    const date = new Date();
    let dateDay = date.getDate() + 15;
    let dateMonth = date.getMonth() + 1;
    let dateYear = date.getFullYear();
    if (dateDay > 30) {
      dateDay = dateDay - 30;
      dateMonth = dateMonth + 1;
    }
    if (dateMonth > 12) {
      dateMonth = dateMonth - 12;
      dateYear = dateYear + 1;
    }
    const dateExpiration = new Date(dateYear + '/' + dateMonth + '/' + dateDay);
    return dateExpiration;
  };

  return (
    <Styled.Wrapper>
      <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
        <h4 className="card-header ">Item da compra</h4>
        <div className="card-body">
          <ItemPurchasesForm itemPurchases={itemPurchases} product={product} onSubmit={handleSubmit} />
        </div>
      </div>
      {!!product && !!itemPurchasesArray && <ItemPurchaseDTOListing item={itemPurchasesArray} product={product} />}
    </Styled.Wrapper>
  );
};
