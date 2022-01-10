/* eslint-disable react-hooks/exhaustive-deps */
import * as Styled from './styles';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Category } from 'app/models/category';
import { connect, ConnectedProps } from 'react-redux';
import { LoadAllCategory, DeleteCategory } from 'store/actions/category';

type Props = PropsFromRedux;

const CategoryListing = (props: Props) => {
  const [categoryDelete, setCategoryDelete] = useState<Category>({ id: null, name: '' });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      {props.category.length >= 1 && (
        <BootstrapTable
          keyField="id"
          data={props.category}
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
              props.delete(categoryDelete.id);
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

const mapStateToProps = ({ category }) => {
  return {
    category: category.category as Category[],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAll: () => dispatch(LoadAllCategory()),
    delete: (id) => dispatch(DeleteCategory(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CategoryListing);
