import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CountDashboard, SumDashboard, TopDashboard } from 'store/actions/dashboard';
import { BarChart } from './barchart';
import { CardInfo } from './cardInfo';
import * as Styled from './styles';
import { CountDashboardType } from '../../app/models/dashboard';

type Props = PropsFromRedux;

const Home = (props: Props) => {
  useEffect(() => {
    props.loadCountDashboard();
    props.loadSumDashboard();
    props.loadTopDashboard();
  }, []);
  return (
    <Styled.Wrapper>
      <CardInfo productCount={props.count.productCount} purchasesCount={props.count.purchasesCount} />
      <BarChart values={props.sum} />
    </Styled.Wrapper>
  );
};

const mapStateToProps = ({ dashboard }) => {
  return {
    count: dashboard.count as CountDashboardType,
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
