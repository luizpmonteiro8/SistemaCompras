import { Menu } from 'components';
import { useEffect, useContext } from 'react';
import { Footer } from 'components/footer';
import * as Styled from './styles';
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/client';

export type BaseProps = {
  children?: React.ReactNode;
};

export const Base = ({ children }: BaseProps) => {
  const [session, loading] = useSession();

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.js');
  }, []);
  return (
    <Styled.Wrapper>
      <Styled.MenuContainer>{!!session && <Menu />}</Styled.MenuContainer>
      <Styled.Container className="container-md p-0 row mx-auto  justify-content-center">
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
        <Styled.ContentContainer className="col-md-12 ">{children}</Styled.ContentContainer>
      </Styled.Container>
      <Styled.FooterContainer className="col-md-12">
        <Footer />
      </Styled.FooterContainer>
    </Styled.Wrapper>
  );
};
