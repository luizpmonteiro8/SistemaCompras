/* eslint-disable react-hooks/exhaustive-deps */
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
import { getItemCookie, setItemCookie, deleteItemCookie } from 'cookies/index';
import { addItemPurchasesUpdate } from 'store/actions/purchases';

interface Props extends PropsFromRedux {
  purchases: PurchasesDTO;
}

const ItemPurchasesRegistration = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [renderItem, setRenderItem] = useState(getItemCookie());

  useEffect(() => {
    props.loadCategory();
    props.loadProduct();
    if (props.purchases.itemPurchaseDTOList?.length >= 1) {
      setRenderItem(props.purchases.itemPurchaseDTOList); //send to list
    }
  }, [props.purchases]);

  const handleSubmit = (itemPurchases: itemPurchaseDTO, { resetForm }) => {
    try {
      const itemListCookie: itemPurchaseDTO[] = getItemCookie();
      if (!id) {
        itemPurchases.id = itemListCookie?.length >= 1 ? itemListCookie.slice(-1)[0].id + 1 : 1;
        setItemCookie(itemPurchases);
        setRenderItem(getItemCookie());
        resetForm();
      } else {
        const newArrayList: itemPurchaseDTO[] = renderItem;
        itemPurchases.id = newArrayList[newArrayList.length - 1].id + 1;
        newArrayList.push(itemPurchases);
        setRenderItem([...newArrayList]);
        props.addItemPurchases(newArrayList);
        resetForm();
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

  const deleteItem = (id) => {
    if (!props.purchases.id) {
      deleteItemCookie(id);
      setRenderItem(getItemCookie());
    } else {
      let newArrayList: itemPurchaseDTO[] = renderItem;
      newArrayList = newArrayList.filter((item) => {
        return item.id != id;
      });
      setRenderItem([...newArrayList]);
      props.addItemPurchases(newArrayList);
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
                isLoading={props.isLoading}
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
          deleteActive={!props.purchases?.status?.includes('Entregue')}
        />
      )}
    </Styled.Wrapper>
  );
};

const mapStateToProps = ({ purchases, category, product }) => {
  return {
    category: category.category as Category[],
    product: product.product as Product[],
    itemPurchases: purchases.itemPurchasesUpdate as itemPurchaseDTO[],
    isLoading: purchases.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategory: () => dispatch(LoadAllCategory()),
    loadProduct: () => dispatch(LoadAllProduct()),
    addItemPurchases: (itemPurchases) => dispatch(addItemPurchasesUpdate(itemPurchases)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ItemPurchasesRegistration);
