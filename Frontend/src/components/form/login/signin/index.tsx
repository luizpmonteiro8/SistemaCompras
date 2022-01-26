import { Credential, EmailDTO } from 'app/models/user';
import { LoginForm } from './form';
import { signIn } from 'next-auth/react';
import { messageError, messageInfo, messageSucess } from 'components';
import * as Styled from './styles';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useUserService } from 'app/services';

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};
const Login = ({ setLoading, loading }: Props) => {
  const route = useRouter();
  const [crendetialLoading, setCredencital] = useState<Credential>();
  let controlMessage = true;
  const service = useUserService();

  useEffect(() => {
    if (loading && crendetialLoading != null) {
      const interval = setInterval(() => {
        handleSubmit(crendetialLoading);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSubmit = async (credential: Credential) => {
    setCredencital(credential);
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: credential.email,
      password: credential.password,
    });
    if (!res.error) {
      route.push('home');
      setLoading(false);
    }
    if (res.error.includes('failed')) {
      if (controlMessage) {
        controlMessage = false;
        messageInfo('Aguarde enquanto servidor ativa!');
      }
    }

    if (res.error.includes('Email ou senha incorreta')) {
      messageError(res.error);
      setLoading(false);
    }
  };

  const forgotPassword = async (emailDTO: EmailDTO) => {
    await service
      .forgotPassword(emailDTO)
      .then(() => {
        messageSucess('Nova senha enviado por email!');
      })
      .catch((err) => {
        messageError(err.response.data.message);
      });
  };

  return (
    <Styled.Wrapper>
      <Styled.Card className="card bg-light mx-auto ">
        <h4 className="card-header ">Login</h4>
        <div className="card-body"></div>
        <LoginForm onSubmit={handleSubmit} forgotPassword={forgotPassword} />
      </Styled.Card>
    </Styled.Wrapper>
  );
};

export default Login;
