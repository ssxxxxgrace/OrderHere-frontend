import React from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Button, Typography, Box } from '@mui/material';

const loginWithFacebook = () =>
  signIn('facebook', { callbackUrl: 'http://localhost:3000' });

const GoogleSignInBtn = ({ children }) => {
  const { data: session, error } = useSession();
  const handleLogin = () => {
    if (!session) {
      loginWithFacebook();
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
          src="/icons/signinIcons/facebook-icon.png"
          alt="Facebook Login"
          width={20}
          height={20}
        />
        <Typography>Facebook</Typography>
      </Box>
    </Button>
  );
};

export default GoogleSignInBtn;
