import BootstrapTable from 'react-bootstrap-table-next';
import * as Styled from './styles';
import { itemPurchaseDTO } from 'app/models/purchasesDTO';
import { Product } from 'app/models/product';

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

type props = {
  item: itemPurchaseDTO[];
  product: Product[];
};

export const ItemPurchaseDTOListing = ({ item, product }: props) => {
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
    },
    {
      dataField: 'productId',
      text: 'Produto',
      formatter: (cellContent, row: itemPurchaseDTO) => {
        let productSelect: Product;
        if (typeof product !== 'undefined') {
          product.forEach((i) => {
            if (i.id === row.productId) {
              productSelect = i;
            }
          });

          return <div>{productSelect.name}</div>;
        }
      },
    },
    {
      dataField: 'validaty',
      text: 'Validade',
    },
    {
      dataField: 'quantity',
      text: 'Quantidade',
    },
    {
      dataField: 'price',
      text: 'Preço',
      formatter: (cellContent, row: itemPurchaseDTO) => <div>{formatMoney.format(row.price)}</div>,
    },
    {
      dataField: '',
      text: 'Total',
      isDummyField: true,
      formatter: (cellContent, row: itemPurchaseDTO) => <div>{formatMoney.format(row.price * row.quantity)}</div>,
    },
  ];

  return (
    <Styled.Wrapper>
      <h4 className="h4">
        Quantidade: <b>{item.length}</b>
      </h4>
      <BootstrapTable
        wrapperClasses="table-responsive-md"
        keyField="id"
        data={item}
        columns={columns}
        noDataIndication="Nenhum valor encontrado."
        bootstrap4
        hover
        striped
        bordered={false}
      />
    </Styled.Wrapper>
  );
};
