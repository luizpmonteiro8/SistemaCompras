/* eslint-disable react-hooks/exhaustive-deps */
import BootstrapTable from 'react-bootstrap-table-next';
import { useState, useEffect } from 'react';
import { Market } from 'app/models/market';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as Styled from './styles';
import { connect, ConnectedProps } from 'react-redux';
import { LoadAllMarket, DeleteMarket } from 'store/actions/market';
import { useRouter } from 'next/dist/client/router';

type Props = PropsFromRedux;

const MarketListing = (props: Props) => {
  const [marketDelete, setMarketDelete] = useState<Market>({ id: null, name: '', blocked: false, cnpj: null });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const route = useRouter();

  useEffect(() => {
    props.loadAll();
  }, []);

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Nome',
      sort: true,
    },
    {
      dataField: 'cnpj',
      text: 'CNPJ',
      formatter: (cellContent, row) => <div>{row.cnpj === 0 ? '' : row.cnpj}</div>,
    },
    {
      dataField: 'blocked',
      text: 'Bloqueado',
      formatter: (cellContent, row) => <div>{row.blocked ? 'Sim' : 'Não'}</div>,
    },
    {
      dataField: 'Editar',
      text: 'Editar',
      isDummyField: true,
      csvExport: false,
      formatter: (cell, row: Market) => (
        <div>
          <a onClick={() => route.replace(`/cadastros/mercados?id=${row.id}`)} className="btn btn-warning me-1">
            Alterar
          </a>
          <button
            type="button"
            onClick={() => {
              handleShow();
              setMarketDelete(row);
            }}
            className="btn btn-danger"
          >
            Deletar
          </button>
        </div>
      ),
    },
  ];

  return (
    <Styled.Wrapper>
      {props.market.length >= 1 && (
        <BootstrapTable
          keyField="id"
          data={props.market}
          columns={columns}
          noDataIndication="Nenhum valor encontrado."
          bootstrap4
          hover
          striped
          bordered={false}
        />
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja deletar item <b>{marketDelete.name}</b>?{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button
            autoFocus={true}
            variant="danger"
            onClick={() => {
              props.delete(marketDelete.id);
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

const mapStateToProps = ({ market }) => {
  return {
    market: market.market as Market[],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAll: () => dispatch(LoadAllMarket()),
    delete: (id) => dispatch(DeleteMarket(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(MarketListing);
