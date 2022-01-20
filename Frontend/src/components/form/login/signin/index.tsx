import { Credential } from 'app/models/user';
import { LoginForm } from './form';
import { signIn } from 'next-auth/react';
import { messageError } from 'components';
import * as Styled from './styles';
import { useRouter } from 'next/router';

const Login = () => {
  const route = useRouter();

  const handleSubmit = async (credential: Credential) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: credential.email,
      password: credential.password,
    });
    if (!res.error) {
      route.push('home');
    }
    if (res.error.includes('failed')) {
      messageError('Não foi possível conectar com servidor!');
    }
    if (res.error.includes('Email ou senha incorreta')) {
      messageError(res.error);
    }
  };

  return (
    <Styled.Wrapper>
      <div className="card bg-light mx-auto ">
        <h4 className="card-header ">Login</h4>
        <div className="card-body"></div>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </Styled.Wrapper>
  );
};

export default Login;
