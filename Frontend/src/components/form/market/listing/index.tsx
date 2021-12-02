import BootstrapTable from 'react-bootstrap-table-next';
import { useMarketService } from 'app/services/index';
import { useState, useEffect } from 'react';
import { Market } from 'app/models/market';
import { Router, useRouter } from 'next/router';
import { mensagemErro, mensagemSucesso } from 'components';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as Styled from './styles';

export const MarketListing = () => {
  const [market, setMarket] = useState<Market[]>();
  const service = useMarketService();
  const router = useRouter();
  const { id } = router.query;

  const [marketDelete, setMarketDelete] = useState<Market>({ id: null, name: '', blocked: false, cnpj: null });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loading();
  }, [id]);

  const loading = () => {
    service
      .loadAllMarket()
      .then((i) => {
        setMarket(i);
      })
      .catch((e) => {
        mensagemErro(e.response.data.message);
        if (e.response.data.message === 'Access Denied') {
          router.push('/');
        }
      });
  };

  const deleteMarket = (id) => {
    service
      .deleteMarket(id)
      .then(() => {
        mensagemSucesso('Deletado com sucesso!');
        setMarket(
          market.filter((i) => {
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
          <a href={`/cadastros/mercados?id=${row.id}`} className="btn btn-warning me-1">
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
      {!!market && (
        <BootstrapTable
          keyField="id"
          data={market}
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
            variant="danger"
            onClick={() => {
              deleteMarket(marketDelete.id);
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
