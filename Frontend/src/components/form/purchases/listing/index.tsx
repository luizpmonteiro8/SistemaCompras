import BootstrapTable from 'react-bootstrap-table-next';
import * as Styled from './styles';
import { Purchases } from 'app/models/purchases';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { LoadAllPurchases, DeletePurchases } from 'store/actions/purchases';

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
type Props = PropsFromRedux;

const PurchasesListing = (props: Props) => {
  const [purchasesDelete, setpurchasesDelete] = useState<Purchases>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      footer: '',
    },
    {
      dataField: 'date',
      text: 'Data',
      formatter: (cellContent, row: Purchases) => {
        if (typeof row !== 'undefined') {
          const dateFormat: Date = new Date(String(row.date).slice(0, 19));
          dateFormat.setHours(dateFormat.getHours() + 3);
          return (
            <div>
              {dateFormat.toLocaleDateString('pt-BR') !== 'Invalid Date' ? dateFormat.toLocaleDateString('pt-BR') : ''}
            </div>
          );
        }
      },
      footer: '',
    },
    {
      dataField: 'market.name',
      text: 'Mercado',
      footer: '',
    },
    {
      dataField: 'status',
      text: 'Status',
      footer: 'Total',
    },
    {
      dataField: 'total',
      text: 'Total',
      formatter: (cellContent, row) => <div>{formatMoney.format(row.total)}</div>,
      footer: (columnData) => formatMoney.format(columnData.reduce((acc, item) => acc + item, 0)),
    },
    {
      dataField: 'Editar',
      text: 'Editar',
      isDummyField: true,
      csvExport: false,
      formatter: (cell, row: Purchases) => {
        return (
          <div className="col-md-12">
            <a className="btn btn-warning me-1 col-xl-6 btn-sm" href={`/compras/cadastro?id=${row.id}`}>
              {row.status === 'Entregue' ? 'Visualizar' : 'Alterar'}
            </a>
            {String(row.status).includes('Em rota') && (
              <button
                type="button"
                onClick={() => {
                  handleShow();
                  setpurchasesDelete(row);
                }}
                className="btn btn-danger col-xl-5 btn-sm"
              >
                Deletar
              </button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    props.loadAll();
  }, []);

  return (
    <Styled.Wrapper>
      {props.purchases && (
        <div>
          <h4 className="h4">
            Quantidade:<b>{props.purchases.length}</b>
          </h4>
          <BootstrapTable
            wrapperClasses="table-responsive-md"
            keyField="id"
            data={props.purchases}
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
              props.delete(purchasesDelete.id);
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

const mapStateToProps = ({ purchases }) => {
  return {
    purchases: purchases.purchases as Purchases[],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAll: () => dispatch(LoadAllPurchases()),
    delete: (id) => dispatch(DeletePurchases(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PurchasesListing);
