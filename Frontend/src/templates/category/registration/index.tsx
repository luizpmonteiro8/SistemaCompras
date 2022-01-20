import CategoryRegistration from 'components/form/category/registration/index';
import CategoryListing from 'components/form/category/listing/index';
import { Base } from '../../base';
import * as Styled from './styles';

export const CategoryRegistationTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <CategoryRegistration />
        <CategoryListing />
      </Base>
    </Styled.Wrapper>
  );
};
