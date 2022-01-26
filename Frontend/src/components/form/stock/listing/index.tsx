/* eslint-disable react-hooks/exhaustive-deps */
import BootstrapTable from 'react-bootstrap-table-next';
import { useEffect } from 'react';
import { Stock } from 'app/models/stock';
import * as Styled from './styles';
import { connect, ConnectedProps } from 'react-redux';
import { LoadAllStock } from 'store/actions/stock';
import { EntraceExit } from 'app/models/entraceexit';

type Props = PropsFromRedux;

const StockListing = (props: Props) => {
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
      dataField: 'category',
      text: 'Categoria',
      formatter: (cellContent, row: Stock) => <div>{row?.product.category.name}</div>,
    },
    {
      dataField: 'product',
      text: 'Produto',
      formatter: (cellContent, row: Stock) => <div>{row?.product.name}</div>,
    },
    {
      dataField: 'quantity',
      text: 'Quantidade',
      formatter: (cell, row: EntraceExit) => <div>{row?.quantity.toString().replace('.', ',')}</div>,
    },
    {
      dataField: 'blocked',
      text: 'Bloqueado',
      formatter: (cellContent, row) => <div>{row.blocked ? 'Sim' : 'Não'}</div>,
    },
  ];

  return (
    <Styled.Wrapper>
      {props.stock && (
        <BootstrapTable
          keyField="id"
          data={props.stock}
          columns={columns}
          noDataIndication="Nenhum valor encontrado."
          bootstrap4
          hover
          striped
          bordered={false}
        />
      )}
    </Styled.Wrapper>
  );
};

const mapStateToProps = ({ stock }) => {
  return {
    stock: stock.stock as Stock[],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAll: () => dispatch(LoadAllStock()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StockListing);
