import PurchasesListing from 'components/form/purchases/listing';
import { useEffect } from 'react';
import { Base } from '../../base';
import * as Styled from './styles';

export const PurchasesListingTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Lista de compras';
  }, []);
  return (
    <Styled.Wrapper>
      <Base>
        <PurchasesListing />
      </Base>
    </Styled.Wrapper>
  );
};
