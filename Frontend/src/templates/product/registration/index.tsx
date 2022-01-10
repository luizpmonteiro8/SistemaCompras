import ProductRegistration from 'components/form/product/registration/index';
import ProductListing from 'components/form/product/listing/index';
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
