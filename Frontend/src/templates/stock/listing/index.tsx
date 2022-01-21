import StockListing from 'components/form/stock/listing';
import { useEffect } from 'react';
import { Base } from '../../base';
import * as Styled from './styles';

export const StockListingTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Estoque';
  }, []);

  return (
    <Styled.Wrapper>
      <Base>
        <StockListing />
      </Base>
    </Styled.Wrapper>
  );
};
