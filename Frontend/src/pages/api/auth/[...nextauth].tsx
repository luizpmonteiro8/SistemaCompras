import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { Credential } from 'app/models/user/index';
import { httpClient } from 'app/http';
import jwt from 'jsonwebtoken';

type NextAuthSession = {
  jwt: string;
};

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 2592000,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',

      credentials: {},
      async authorize(credentials: Credential) {
        if (!credentials.email && !credentials.password) {
          return null;
        }
        console.log('teste');
        const credential: Credential = { email: credentials.email, password: credentials.password };
        const response = await httpClient.post('/login', credential);
        return { jwt: response.headers.authorization };
      },
    }),
  ],
  callbacks: {
    jwt: async (token: NextAuthSession, response: NextAuthSession) => {
      const isSignIn = !!response;
      if (isSignIn) {
        if (!response.jwt) {
          return Promise.resolve({});
        } else {
          token.jwt = response.jwt;
        }
      }
      return Promise.resolve(token);
    },
    session: async (session, token: NextAuthSession) => {
      if (!token?.jwt) {
        return null;
      }
      const decodeToken: any = jwt.decode(token.jwt.slice(7));
      session.user.email = decodeToken.sub.toString();
      session.expires = decodeToken.exp.toString();
      session.accessToken = token.jwt;
      return { ...session };
    },
  },
});
