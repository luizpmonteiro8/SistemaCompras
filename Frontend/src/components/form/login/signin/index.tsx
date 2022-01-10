import { Credential } from 'app/models/user';
import { LoginForm } from './form';
import { signIn, getSession } from 'next-auth/react';
import { messageError } from 'components';

const Login = () => {
  const handleSubmit = async (credential: Credential) => {
    const session = await getSession();
    console.log('session', session);
    await signIn('credentials', {
      redirect: false,
      email: credential.email,
      password: credential.password,
    });
    console.log('session', session);
    if (!session.accessToken) {
      messageError('Email ou senha incorreto!');
    }
  };

  return (
    <div className="card bg-light my-2 mx-auto col-8" style={{}}>
      <h4 className="card-header ">Login</h4>
      <div className="card-body"></div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
