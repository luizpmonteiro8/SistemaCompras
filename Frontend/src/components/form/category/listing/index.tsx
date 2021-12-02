import BootstrapTable from 'react-bootstrap-table-next';
import { useCategoryService } from 'app/services/index';
import { useState, useEffect } from 'react';
import { Category } from 'app/models/category';
import { Router, useRouter } from 'next/router';
import { mensagemErro, mensagemSucesso } from 'components';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as Styled from './styles';

export const CategoryListing = () => {
  const [category, setCategory] = useState<Category[]>();
  const service = useCategoryService();
  const router = useRouter();
  const { id } = router.query;

  const [categoryDelete, setCategoryDelete] = useState<Category>({ id: null, name: '' });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loading();
  }, [id]);

  const loading = () => {
    service
      .loadAllCategory()
      .then((category) => {
        setCategory(category);
      })
      .catch((e) => {
        mensagemErro(e.response.data.message);
        if (e.response.data.message === 'Access Denied') {
          router.push('/');
        }
      });
  };

  const deleteCategory = (id) => {
    service
      .deleteCategory(id)
      .then(() => {
        mensagemSucesso('Deletado com sucesso!');
        router.replace('/cadastros/categorias');
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
      dataField: 'Editar',
      text: 'Editar',
      isDummyField: true,
      csvExport: false,
      formatter: (cell, row: Category) => (
        <div>
          <a href={`/cadastros/categorias?id=${row.id}`} className="btn btn-warning me-1">
            Alterar
          </a>
          <button
            type="button"
            onClick={() => {
              handleShow();
              setCategoryDelete(row);
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
      {!!category && (
        <BootstrapTable
          keyField="id"
          data={category}
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
        <Modal.Body>Deseja deletar item {categoryDelete.name}? </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteCategory(categoryDelete.id);
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
