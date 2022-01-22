import { UserRegistration } from 'components';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Base } from '../../base';
import * as Styled from './styles';

export const UserRegistationTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Cadastro de usuário';
  }, []);
  return (
    <Styled.Wrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UserRegistration />
    </Styled.Wrapper>
  );
};
