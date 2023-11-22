import React from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Button, Box, Typography } from '@mui/material';

const loginWithGoogle = () =>
  signIn('google', { callbackUrl: 'http://localhost:3000' });

const GoogleSignInBtn = ({ children }) => {
  const { data: session, error } = useSession();
  if (error) {
    console.error('Error during Google sign-in:', error);
  }

  if (session) {
    console.log('User is signed in:', session.user);
    //todo: set isLogin become successful
  }

  return (
    <Button
      onClick={loginWithGoogle}
      variant="outlined"
      style={{ backgroundColor: 'white', width: '90%', maxWidth: '250px' }}
    >
      <Box display="flex" alignItems="center">
        <Image
          src="/icons/signinIcons/google-icon.png"
          alt="google Login"
          width={20}
          height={20}
        />
        <Typography> Google</Typography>
      </Box>
    </Button>
  );
};

export default GoogleSignInBtn;
