import BootstrapTable from 'react-bootstrap-table-next';
import * as Styled from './styles';
import { Purchases } from 'app/models/purchases';
import { usePurchasesService } from 'app/services/purchases.service';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { mensagemErro, mensagemSucesso } from 'components';
import { useRouter } from 'next/dist/client/router';

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const PurchasesListing = () => {
  const purchasesService = usePurchasesService();
  const [purchases, setPurchases] = useState<Purchases[]>();
  const router = useRouter();

  const [purchasesDelete, setpurchasesDelete] = useState<Purchases>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deletePurchases = (id) => {
    purchasesService
      .deletePurchases(id)
      .then(() => {
        mensagemSucesso('Deletado com sucesso!');
        setPurchases(
          purchases.filter((i) => {
            return i.id !== id;
          }),
        );
      })
      .catch((e) => {
        mensagemErro(e.response.data.message);
      });
  };

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
    },
    {
      dataField: 'instantDate',
      text: 'Data',
      formatter: (cellContent, row) => {
        if (typeof row !== 'undefined') {
          const dateFormat: Date = row.instantDate;
          console.log(row);
          return <div>{dateFormat}</div>;
        }
      },
    },
    {
      dataField: 'market.name',
      text: 'Mercado',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: (cellContent, row) => <div>{row.status === 'DELIVERED' ? 'Entregue' : 'Em rota'}</div>,
    },
    {
      dataField: 'total',
      text: 'Total',
      formatter: (cellContent, row) => <div>{formatMoney.format(row.total)}</div>,
    },
    {
      dataField: 'Editar',
      text: 'Editar',
      isDummyField: true,
      csvExport: false,
      formatter: (cell, row: Purchases) => (
        <div>
          <a href={`/compras/cadastro?id=${row.id}`} className="btn btn-warning me-1">
            Alterar
          </a>
          <button
            type="button"
            onClick={() => {
              handleShow();
              setpurchasesDelete(row);
            }}
            className="btn btn-danger"
          >
            Deletar
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    purchasesService
      .loadAllPurchases()
      .then((i) => {
        setPurchases(i);
      })
      .catch((e) => {
        mensagemErro(e.message);
      });
  }, []);

  return (
    <Styled.Wrapper>
      {!!purchases && (
        <div>
          <h4 className="h4">
            Quantidade:<b>{purchases.length}</b>
          </h4>
          <BootstrapTable
            wrapperClasses="table-responsive-md"
            keyField="id"
            data={purchases}
            columns={columns}
            noDataIndication="Nenhum valor encontrado."
            bootstrap4
            hover
            striped
            bordered={false}
          />
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja deletar compra {typeof purchasesDelete !== 'undefined' ? purchasesDelete.id : null}?{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deletePurchases(purchasesDelete.id);
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
