import { useState, useEffect } from 'react';
import { Market } from 'app/models/market';
import { MarketForm } from './form';
import { useRouter } from 'next/dist/client/router';
import { SaveMarket, UpdateMarket } from 'store/actions/market';
import { connect, ConnectedProps } from 'react-redux';
import { messageSucess } from 'components';
import { messageError } from 'components/common/toastr';

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
    try {
      if (marketItem.id > 0) {
        const returnValue = await props.updateMarket(marketItem);
        if (returnValue) {
          resetForm({});
          setValues({ id: '', name: '', blocked: false, cnpj: '' });
          router.replace('/cadastros/mercados');
          messageSucess('Alterado com sucesso.');
        }
      } else {
        const returnValue = await props.saveMarket(marketItem);
        if (returnValue) {
          resetForm({});
          messageSucess('Salvo com sucesso.');
        }
      }
    } catch (err) {
      messageError(err.message);
    }
  };

  return (
    <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
      <h4 className="card-header ">Mercado</h4>
      <MarketForm market={market} onSubmit={handleSubmit} />
      <div className="card-body"></div>
    </div>
  );
};

const mapStateToProps = ({ market }) => {
  return {
    market: market.market as Market[],
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
