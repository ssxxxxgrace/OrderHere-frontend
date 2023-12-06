import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '../../../services/Public';
import jwt from 'jsonwebtoken';
import { use } from 'react';

export const authOptions = {
  secret: process.env.AUTH_SECRET,

  // Configure authentication providers
  providers: [
    //email and password login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const response = await login(credentials.email, credentials.password);
          if (response.status === 200 && response.data) {
            const token = response.data.token;
            //verify Jwt token
            const parts = token.split('.');
            if (parts.length !== 3) {
              console.error('JWT token error, invalid JWT');
            }
            //parse Jwt to Json
            const decoded = atob(parts[1]);
            const jwtObject = JSON.parse(decoded);
            //extract key information
            const userEmail = jwtObject.sub;
            const userId = jwtObject.userId;
            const userName = jwtObject.userName;
            const userAvatar = jwtObject.avatarURL;

            //return User object
            return {
              id: userId,
              name: userName,
              image: userAvatar,
              token: jwtObject,
              jwt: token,
            };
          }
        } catch (error) {
          return null;
        }
      },
    }),
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      //avoid token refresh
      authorization: {
        params: {
          prompt: 'consent',
          scope: 'openid email profile',
        },
      },
    }),
    // Facebook Provideer
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.account = account;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.token = token;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
