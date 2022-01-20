import { Menu } from 'components';
import { useEffect, useContext } from 'react';
import { Footer } from 'components/footer';
import * as Styled from './styles';
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export type BaseProps = {
  children?: React.ReactNode;
};

export const Base = ({ children }: BaseProps) => {
  const { status } = useSession();
  const route = useRouter();

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.js');
    if (status === 'unauthenticated') {
      route.push('/');
    }
  }, []);
  return (
    <Styled.Wrapper>
      <Styled.MenuContainer>{status === 'authenticated' && <Menu />}</Styled.MenuContainer>
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
