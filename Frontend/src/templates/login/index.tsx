import { Base } from '../base';
import * as Styled from './styles';
import Login from 'components/form/login/signin';

export const LoginTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <Login />
      </Base>
    </Styled.Wrapper>
  );
};
