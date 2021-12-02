import { useState, useEffect, useContext } from 'react';
import { Market } from 'app/models/marketItem';
import { useMarketService } from 'app/services';
import { MarketForm } from './form';
import { useRouter } from 'next/dist/client/router';
import { mensagemErro, mensagemSucesso } from 'components';

export const MarketRegistration = () => {
  const service = useMarketService();
  const [market, setMarket] = useState<Market>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service.loadMarket(id).then((marketFind) => setMarket(marketFind));
    }
  }, [id]);

  const handleSubmit = (marketItem: Market) => {
    if (marketItem.id > 0) {
      service
        .update(marketItem)
        .then((marketSalvo) => {
          mensagemSucesso('Alterado com sucesso!');
          setMarket(
            market.filter((i) => {
              i.id === id;
            }),
          );
          setMarket([...market, marketItem]);
        })
        .catch((e) => {
          mensagemErro(e.response.data.message);
        });
    } else {
      service
        .save(marketItem)
        .then((response) => {
          mensagemSucesso('Salvo com sucesso!');
          setMarket([...market, marketItem]);
        })
        .catch((e) => {
          mensagemErro(e.response.data.message);
          console.log(e);
        });
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
