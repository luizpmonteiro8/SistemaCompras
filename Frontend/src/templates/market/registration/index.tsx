import { MarketRegistration } from 'components';
import { MarketListing } from 'components';
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
