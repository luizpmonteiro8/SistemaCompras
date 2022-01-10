import MarketRegistration from 'components/form/market/registration/index';
import MarketListing from 'components/form/market/listing/index';
import { Base } from '../../base';
import * as Styled from './styles';

export const MarketRegistationTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <MarketRegistration />
        <MarketListing />
      </Base>
    </Styled.Wrapper>
  );
};
