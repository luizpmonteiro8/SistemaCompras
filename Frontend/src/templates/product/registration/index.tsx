import { ProductRegistration } from 'components';
import { ProductListing } from 'components';
import { Base } from '../../base';
import * as Styled from './styles';

export const ProductRegistationTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <ProductRegistration />
        <ProductListing />
      </Base>
    </Styled.Wrapper>
  );
};
