import React, { useEffect } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import hotToast from '../../../utils/hotToast';

/**
 * handle google login action
 * google will handle the callback URL(config this in console.cloud.google.com )
 */
const handleGoogleSignIn = async () => {
  const res = await signIn('google');
};

/**
 * Google login button Component
 */
const GoogleSignInBtn = ({ children }) => {
  return (
    <Button
      onClick={handleGoogleSignIn}
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
