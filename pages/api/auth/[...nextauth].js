import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import {
  createUser,
  findUser,
  findUserCreatedByProviders,
} from '../../../services/User';
import { Password } from '@mui/icons-material';
import { signup } from '../../../services/Public';
import loginAction from '../../../store/actions/httpAction';

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  // Configure authentication providers
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      //avoid token refresh
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
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
    async signIn({ user, account, profile}){
      return true;
    }
  },
};

export default NextAuth(authOptions);
