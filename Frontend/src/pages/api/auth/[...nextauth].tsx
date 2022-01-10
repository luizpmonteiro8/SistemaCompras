import NextAuth from 'next-auth';
import { Credential } from 'app/models/user/index';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        const url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
        try {
          const res = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(credential),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const response: Response = await res;
          const authorization = { id: response.headers.get('Authorization') };
          console.log('autorization', authorization);
          if (authorization) {
            return authorization;
          } else {
            return null;
          }
        } catch (err) {
          throw new Error('Não foi possivel conectar com servidor.');
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
