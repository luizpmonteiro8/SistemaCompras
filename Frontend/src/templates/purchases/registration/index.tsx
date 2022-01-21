import PurchasesRegistration from 'components/form/purchases/registration';
import { useEffect } from 'react';
import { Base } from '../../base';
import * as Styled from './styles';

export const PurchasesRegistationTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Compras';
  }, []);

  return (
    <Styled.Wrapper>
      <Base>
        <PurchasesRegistration />
      </Base>
    </Styled.Wrapper>
  );
};
