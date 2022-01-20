import PurchasesRegistration from 'components/form/purchases/registration';
import { Base } from '../../base';
import * as Styled from './styles';

export const PurchasesRegistationTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <PurchasesRegistration />
      </Base>
    </Styled.Wrapper>
  );
};
