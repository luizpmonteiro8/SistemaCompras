import { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import * as Styled from './styles';
import { itemPurchaseDTO } from 'app/models/purchasesDTO';
import { Product } from 'app/models/product';
import { Modal, Button } from 'react-bootstrap';

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

type props = {
  item: itemPurchaseDTO[];
  product: Product[];
  deleteActive: boolean;
  deleteItemCookie: (id) => void;
};

export const ItemPurchaseDTOListing = ({ item, product, deleteItemCookie, deleteActive }: props) => {
  const [itemDelete, setItemDelete] = useState<itemPurchaseDTO>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let total = 0;

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      footer: () => '',
    },

    {
      dataField: 'productId',
      text: 'Produto',
      formatter: (cellContent, row: itemPurchaseDTO) => {
        return product?.map((i) => {
          if (i.id === row.productId) {
            return <div>{i.name}</div>;
          }
        });
      },
      footer: () => '',
    },
    {
      dataField: 'validaty',
      text: 'Validade',
      formatter: (cellContent, row: itemPurchaseDTO) => {
        if (typeof row.validaty !== 'undefined') {
          const dateFormat: Date = new Date(String(row.validaty).slice(0, 19));
          dateFormat.setHours(dateFormat.getHours() + 3);
          return <div>{dateFormat.toString() != 'Invalid Date' ? dateFormat.toLocaleDateString('pt-BR') : null}</div>;
        }
      },
      footer: () => '',
    },
    {
      dataField: 'quantity',
      text: 'Quantidade',
      formatter: (cellContent, row: itemPurchaseDTO) => <div>{row.quantity.toString().replace('.', ',')}</div>,
      footer: () => '',
    },
    {
      dataField: 'price',
      text: 'Preço',
      formatter: (cellContent, row: itemPurchaseDTO) => <div>{formatMoney.format(row.price)}</div>,
      footer: () => 'Total',
    },
    {
      dataField: 'total',
      text: 'Total',
      formatter: (cellContent, row: itemPurchaseDTO) => <div>{formatMoney.format(row.price * row.quantity)}</div>,
      classes: (cell, row: itemPurchaseDTO, rowIndex, colIndex) => {
        total += row.price * row.quantity;
      },
      footer: () => formatMoney.format(total),
    },
    {
      dataField: '',
      text: 'Excluir',
      isDummyField: true,
      hidden: deleteActive,
      formatter: (cell, row: itemPurchaseDTO, rowIndex, colIndex) => (
        <button
          type="button"
          onClick={() => {
            handleShow();
            setItemDelete(row);
          }}
          className="btn btn-danger btn-sm"
        >
          Deletar
        </button>
      ),
    },
  ];

  return (
    <Styled.Wrapper>
      {item && product.length >= 1 && !!deleteActive && (
        <>
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
        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja deletar item {itemDelete?.id}? </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteItemCookie(itemDelete.id);
              handleClose();
            }}
          >
            Deletar
          </Button>
          <Button variant="info" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Styled.Wrapper>
  );
};
