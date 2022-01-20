import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CountDashboard, SumDashboard, TopDashboard } from 'store/actions/dashboard';
import { BarChart } from './barchart';
import * as Styled from './styles';

type Props = PropsFromRedux;

const Home = (props: Props) => {
  useEffect(() => {
    props.loadCountDashboard();
    props.loadSumDashboard();
    props.loadTopDashboard();
  }, []);
  return (
    <Styled.Wrapper>
      <div className="card bg-light mx-auto col-md-3">
        <h4 className="card-header ">Cadastros</h4>
        <div className="card-body">
          Produtos: {props.count.productCount} <br />
          Compras: {props.count.purchasesCount}
        </div>
      </div>
      <BarChart values={props.sum} />
    </Styled.Wrapper>
  );
};

const mapStateToProps = ({ dashboard }) => {
  return {
    count: dashboard.count,
    sum: dashboard.sum,
    top: dashboard.top,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCountDashboard: () => dispatch(CountDashboard()),
    loadSumDashboard: () => dispatch(SumDashboard()),
    loadTopDashboard: () => dispatch(TopDashboard()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Home);
