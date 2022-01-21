import { Base } from '../base';
import * as Styled from './styles';
import Login from 'components/form/login/signin';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Loading } from './../../components/common/loading/index';
import { Footer } from 'components/footer';

export const LoginTp = () => {
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  if (status === 'authenticated') {
    router.push('/home');
  }
  useEffect(() => {
    document.title = 'Sistema compras';
  }, []);

  return (
    <Styled.Wrapper>
      {loading && <Loading />}
      <Login setLoading={setLoading} loading={loading} />
      <Footer />
    </Styled.Wrapper>
  );
};
