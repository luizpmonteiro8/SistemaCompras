import ProductRegistration from 'components/form/product/registration/index';
import ProductListing from 'components/form/product/listing/index';
import { Base } from '../../base';
import * as Styled from './styles';
import { useEffect } from 'react';

export const ProductRegistationTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Produtos';
  }, []);

  return (
    <Styled.Wrapper>
      <Base>
        <ProductRegistration />
        <ProductListing />
      </Base>
    </Styled.Wrapper>
  );
};
