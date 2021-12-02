import BootstrapTable from 'react-bootstrap-table-next';
import { useProductService } from 'app/services/index';
import { useState, useEffect } from 'react';
import { Product } from 'app/models/product';
import { Router, useRouter } from 'next/router';
import { mensagemErro, mensagemSucesso } from 'components';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as Styled from './styles';

export const ProductListing = () => {
  const [product, setProduct] = useState<Product[]>();
  const service = useProductService();
  const router = useRouter();
  const { id } = router.query;

  const [productDelete, setProductDelete] = useState<Product>({
    id: null,
    name: '',
    blocked: false,
    quantMin: null,
    category: { id: null, name: '' },
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loading();
  }, [id]);

  const loading = () => {
    service
      .loadAllProduct()
      .then((product) => {
        setProduct(product);
      })
      .catch((e) => {
        mensagemErro(e.response.data.message);
        if (e.response.data.message === 'Access Denied') {
          router.push('/');
        }
      });
  };

  const deleteProduct = (id) => {
    service
      .deleteProduct(id)
      .then(() => {
        mensagemSucesso('Deletado com sucesso!');
        router.reload();
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
      dataField: 'name',
      text: 'Nome',
      sort: true,
    },
    {
      dataField: 'category.name',
      text: 'Categoria',
    },
    {
      dataField: 'quantMin',
      text: 'Quantidade mínima',
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
      formatter: (cell, row: Product) => (
        <div>
          <a href={`/cadastros/produtos?id=${row.id}`} className="btn btn-warning me-1">
            Alterar
          </a>
          <button
            type="button"
            onClick={() => {
              handleShow();
              setProductDelete(row);
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
      {!!product && (
        <BootstrapTable
          wrapperClasses="table-responsive-md"
          keyField="id"
          data={product}
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
        <Modal.Body>Deseja deletar item {productDelete.name}? </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteProduct(productDelete.id);
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
