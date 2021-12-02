import { useEffect, useState } from 'react';
import { Credential } from 'app/models/user';
import { useUserService } from 'app/services';
import { LoginForm } from './form';
import { mensagemErro } from 'components';
import { signIn, useSession } from 'next-auth/client';

export const Login = () => {
  const service = useUserService();
  const [session, loading] = useSession();

  const handleSubmit = async (credential: Credential) => {
    await signIn('credentials', { redirect: false, email: credential.email, password: credential.password });
  };

  return (
    <div className="card bg-light my-2 mx-auto col-8" style={{}}>
      <h4 className="card-header ">Login</h4>

      <div className="card-body"></div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
