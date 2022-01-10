import * as Styled from './styles';
import { useEffect, useState } from 'react';
import { ItemPurchasesForm } from './form';
import { messageError, messageSucess } from 'components';
import { itemPurchaseDTO, PurchasesDTO } from 'app/models/purchasesDTO';
import { ItemPurchaseDTOListing } from 'components';
import { useRouter } from 'next/dist/client/router';
import { LoadAllCategory } from 'store/actions/category';
import { connect, ConnectedProps } from 'react-redux';
import { LoadAllProduct } from 'store/actions/product';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { addItemPurchasesUpdate } from 'store/actions/purchases';
import { getItemCookie, setItemCookie, removeItemCookie, deleteItemCookie } from 'cookies/index';

interface Props extends PropsFromRedux {
  purchases: PurchasesDTO;
}

const ItemPurchasesRegistration = (props: Props) => {
  const router = useRouter();
  const [renderItem, setRenderItem] = useState(getItemCookie);

  useEffect(() => {
    try {
      props.loadCategory();
      props.loadProduct();
      if (props.purchases.itemPurchaseDTOList.length >= 1) {
        setRenderItem(props.purchases.itemPurchaseDTOList);
      }
    } catch (err) {
      messageError('Erro no carregamento');
    }
  }, [props.purchases]);

  const handleSubmit = (itemPurchases: itemPurchaseDTO, { resetForm, setValues }) => {
    try {
      const itemCookie: itemPurchaseDTO[] = getItemCookie();
      if (!id) {
        itemPurchases.id = itemCookie?.length >= 1 ? itemCookie.slice(-1)[0].id + 1 : 1;
        saveCookie(itemPurchases);
        resetForm();
      } else {
        const id = props.purchasesUpdate.itemPurchaseDTOList[props.purchasesUpdate.itemPurchaseDTOList.length - 1].id;
        itemPurchases.id = id + 1;
        props.addItemPurchases(itemPurchases);
        console.log(props.purchasesUpdate);
      }

      messageSucess('Item adicionado');
    } catch (e) {
      messageError('Erro ao adicionar item');
    }
  };

  const filterProductByCategory = (idCategory) => {
    return props.product.filter((item) => {
      if (item.category.id === idCategory) return item;
    });
  };

  const saveCookie = (itemPurchases) => {
    setItemCookie(itemPurchases);
    setRenderItem(getItemCookie());
  };

  const deleteItem = (id) => {
    if (!props.purchases.id) {
      deleteItemCookie(id);
      setRenderItem(getItemCookie());
    }
  };

  return (
    <Styled.Wrapper>
      {!props.purchases.status?.includes('Entregue') && (
        <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
          <h4 className="card-header ">Item da compra</h4>
          <div className="card-body">
            {props.product?.length >= 1 && props.category?.length >= 1 && (
              <ItemPurchasesForm
                product={props.product}
                category={props.category}
                filterProductByCategory={filterProductByCategory}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      )}
      {typeof props.product !== 'undefined' && !!renderItem && (
        <ItemPurchaseDTOListing
          item={renderItem}
          product={props.product}
          deleteItemCookie={deleteItem}
          deleteActive={props.purchases.status ? props.purchases.status.includes('Entregue') : false}
        />
      )}
    </Styled.Wrapper>
  );
};

const mapStateToProps = ({ purchases, category, product }) => {
  return {
    category: category.category as Category[],
    product: product.product as Product[],
    purchasesUpdate: purchases.purchasesUpdate as PurchasesDTO,
    isLoading: purchases.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategory: () => dispatch(LoadAllCategory()),
    loadProduct: () => dispatch(LoadAllProduct()),
    addItemPurchases: (item) => dispatch(addItemPurchasesUpdate(item)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ItemPurchasesRegistration);
