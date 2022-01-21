import NextAuth from 'next-auth';
import { Credential } from 'app/models/user/index';
import CredentialsProvider from 'next-auth/providers/credentials';
import { messageError } from './../../../components/common/toastr/index';

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
    maxAge: 2592000,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Username', type: 'text ', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credential) {
        if (!credentials.email && !credentials.password) {
          throw new Error('Email e senha requerido.');
        }
        const credential: Credential = { email: credentials.email, password: credentials.password };
        const url = `${process.env.BASEURL}/login`;

        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(credential),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Email ou senha incorreta!');
        }
        const response: Response = res;
        const authorization = { id: response.headers.get('Authorization') };
        if (authorization) {
          return authorization;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (token.sub) {
        return token;
      } else {
        return null;
      }
    },
    session: async ({ session, token }) => {
      if (!token.sub) {
        throw new Error('Email ou senha inválido!');
      }
      session.accessToken = token.sub;
      return { ...session };
    },
  },
});
