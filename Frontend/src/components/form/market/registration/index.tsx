import { useState, useEffect } from 'react';
import { Market } from 'app/models/market';
import { MarketForm } from './form';
import { useRouter } from 'next/dist/client/router';
import { SaveMarket, UpdateMarket } from 'store/actions/market';
import { connect, ConnectedProps } from 'react-redux';

type Props = PropsFromRedux;

const MarketRegistration = (props: Props) => {
  const [market, setMarket] = useState<Market>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      props.market.map((item) => {
        if (item.id === parseInt(id.toString())) {
          setMarket(item);
        }
      });
    }
  }, [id, props.market]);

  const handleSubmit = async (marketItem: Market, { resetForm, setValues }) => {
    if (marketItem.id > 0) {
      if (await props.updateMarket(marketItem)) {
        resetForm({});
        setValues({ id: null, name: '', blocked: false, cnpj: null });
        router.replace('/cadastros/mercados');
      }
    } else {
      if (await props.saveMarket(marketItem)) {
        resetForm({});
        setValues({ id: null, name: '', blocked: false, cnpj: null });
      }
    }
  };

  return (
    <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
      <h4 className="card-header ">Mercado</h4>
      <MarketForm market={market} onSubmit={handleSubmit} isLoading={props.isLoading} />
      <div className="card-body"></div>
    </div>
  );
};

const mapStateToProps = ({ market }) => {
  return {
    market: market.market as Market[],
    isLoading: market.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveMarket: (market: Market) => dispatch(SaveMarket(market)),
    updateMarket: (market: Market) => dispatch(UpdateMarket(market)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(MarketRegistration);
