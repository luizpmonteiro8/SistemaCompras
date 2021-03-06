import CategoryRegistration from 'components/form/category/registration/index';
import CategoryListing from 'components/form/category/listing/index';
import { Base } from '../../base';
import * as Styled from './styles';
import { useEffect } from 'react';

export const CategoryRegistationTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Categoria';
  }, []);
  return (
    <Styled.Wrapper>
      <Base>
        <CategoryRegistration />
        <CategoryListing />
      </Base>
    </Styled.Wrapper>
  );
};
