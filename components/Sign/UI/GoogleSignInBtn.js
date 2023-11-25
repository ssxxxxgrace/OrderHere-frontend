import React, { useEffect } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

const loginWithGoogle = () =>
  signIn('google', { callbackUrl: 'http://localhost:3000' });

const GoogleSignInBtn = ({ children }) => {
  const { data: session, error } = useSession();
  const handleLogin = () => {
    if (!session) {
      loginWithGoogle();
    }
  };
  return (
    <Button
      onClick={handleLogin}
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
