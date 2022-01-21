import MarketRegistration from 'components/form/market/registration/index';
import MarketListing from 'components/form/market/listing/index';
import { Base } from '../../base';
import * as Styled from './styles';
import { useEffect } from 'react';

export const MarketRegistationTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Mercados';
  }, []);
  return (
    <Styled.Wrapper>
      <Base>
        <MarketRegistration />
        <MarketListing />
      </Base>
    </Styled.Wrapper>
  );
};
