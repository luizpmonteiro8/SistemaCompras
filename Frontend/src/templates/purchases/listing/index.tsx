import { PurchasesListing } from 'components';
import { Base } from '../../base';
import * as Styled from './styles';

export const PurchasesListingTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <PurchasesListing />
      </Base>
    </Styled.Wrapper>
  );
};
