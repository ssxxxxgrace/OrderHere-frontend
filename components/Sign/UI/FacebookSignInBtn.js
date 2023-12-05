import React from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Button, Typography, Box } from '@mui/material';

/**
 * handle facebook login action
 */
const loginWithFacebook = () =>
  signIn('facebook', { callbackUrl: 'http://localhost:3000' });

/**
 * Facebook Login button component
 */
const FacebookSignInBtn = ({ children }) => {
  return (
    <Button
      onClick={loginWithFacebook}
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

export default FacebookSignInBtn;
