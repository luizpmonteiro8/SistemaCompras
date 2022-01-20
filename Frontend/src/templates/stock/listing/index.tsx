import StockListing from 'components/form/stock/listing';
import { Base } from '../../base';
import * as Styled from './styles';

export const StockListingTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <StockListing />
      </Base>
    </Styled.Wrapper>
  );
};
