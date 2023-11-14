import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: '495274309991-utft6kl7jcdds3vecom87m1l9c8clf0e.apps.googleusercontent.com',
      clientSecret:'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',
      allowDangerousEmailAccountLinking: true,
    //   profile(profile) {
    //     return {
    //       // Return all the profile information you need.
    //       // The only truly required field is `id`
    //       // to be able identify the account when added to a database
    //     }
    }),

    // FacebookProvider({
    //   clientId: 673178708236283,
    //   clientSecret: 63995313d29259b3c32c11a658d4045c,
    // }),
  ],
};

export default NextAuth(authOptions);
