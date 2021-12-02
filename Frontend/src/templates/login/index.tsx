import { Base } from '../base';
import * as Styled from './styles';
import { Login } from 'components';

export const LoginTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <Login />
      </Base>
    </Styled.Wrapper>
  );
};
