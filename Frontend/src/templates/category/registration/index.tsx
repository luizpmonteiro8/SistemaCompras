import { CategoryRegistration } from 'components';
import { CategoryListing } from 'components';
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
