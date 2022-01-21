import { UserRegistration } from 'components';
import { useEffect } from 'react';
import { Base } from '../../base';
import * as Styled from './styles';

export const UserRegistationTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Cadastro de usuário';
  }, []);
  return (
    <Styled.Wrapper>
      <Base>
        <UserRegistration />
      </Base>
    </Styled.Wrapper>
  );
};
