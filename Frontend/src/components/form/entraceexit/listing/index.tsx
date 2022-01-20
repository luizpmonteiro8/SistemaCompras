/* eslint-disable react-hooks/exhaustive-deps */
import BootstrapTable from 'react-bootstrap-table-next';
import { useState, useEffect } from 'react';
import { EntraceExit } from 'app/models/entraceexit';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as Styled from './styles';
import { connect, ConnectedProps } from 'react-redux';
import { LoadAllEntraceExit, DeleteEntraceExit } from 'store/actions/entraceexit';
import { LoadAllProduct } from 'store/actions/product';
import { Product } from 'app/models/product';
import { useRouter } from 'next/dist/client/router';

type Props = PropsFromRedux;

const EntraceExitListing = (props: Props) => {
  const [entraceexitDelete, setEntraceExitDelete] = useState<EntraceExit>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const route = useRouter();

  useEffect(() => {
    props.loadAll();
    props.loadProduct();
  }, []);

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'productId',
      text: 'Produto',
      sort: true,
      formatter: (cell, row: EntraceExit) => {
        {
          return props?.product.map((i) => {
            if (i.id === row.productId) {
              return <div>{i.name}</div>;
            }
          });
        }
      },
    },
    {
      dataField: 'quantity',
      text: 'Quantidade',
      formatter: (cell, row: EntraceExit) => <div>{row?.quantity.toString().replace('.', ',')}</div>,
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: (cell, row: EntraceExit) => <div>{row?.status ? 'Ativado' : 'Desativado'}</div>,
    },
    {
      dataField: 'type',
      text: 'Tipo',
      formatter: (cell, row: EntraceExit) => <div>{row?.type === 0 ? 'Entrada' : 'Saida'}</div>,
    },
    {
      dataField: 'Editar',
      text: 'Editar',
      isDummyField: true,
      csvExport: false,
      formatter: (cell, row: EntraceExit) => (
        <div>
          {row.status && (
            <>
              <a onClick={() => route.replace(`/cadastros/entradasaida?id=${row.id}`)} className="btn btn-warning me-1">
                Alterar
              </a>
              <button
                type="button"
                onClick={() => {
                  handleShow();
                  setEntraceExitDelete(row);
                }}
                className="btn btn-danger"
              >
                Deletar
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Styled.Wrapper>
      {props.entraceexit.length >= 1 && props.product.length >= 1 && (
        <BootstrapTable
          keyField="id"
          data={props.entraceexit}
          columns={columns}
          noDataIndication="Nenhum valor encontrado."
          bootstrap4
          hover
          striped
          bordered={false}
        />
      )}
      <Modal
        show={show}
        onHide={handleClose}
        onKeyDown={(event) => {
          if (event.keyCode == 13) {
            console.log('aqui');
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deletar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja deletar item <b>{entraceexitDelete?.id}</b>?{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button
            autoFocus={true}
            variant="danger"
            onClick={() => {
              props.delete(entraceexitDelete.id);
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

const mapStateToProps = ({ entraceExit, product }) => {
  return {
    entraceexit: entraceExit.entraceExit as EntraceExit[],
    product: product.product as Product[],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAll: () => dispatch(LoadAllEntraceExit()),
    delete: (id) => dispatch(DeleteEntraceExit(id)),
    loadProduct: () => dispatch(LoadAllProduct()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(EntraceExitListing);
