import { UserRegistration } from 'components';
import { Base } from '../../base';
import * as Styled from './styles';

export const UserRegistationTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <UserRegistration />
      </Base>
    </Styled.Wrapper>
  );
};
