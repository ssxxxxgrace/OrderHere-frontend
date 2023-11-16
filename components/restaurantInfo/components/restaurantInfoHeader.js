import React from 'react';
import { Box, Typography } from '@mui/material';
import image from '../../../public/image/cart-bg.png';

const RestaurantInfoHeader = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        backgroundImage: 'url(/image/cart-bg.png)',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ fontSize: '45px' }}>
        RESTAURANT INFO
      </Typography>
    </Box>
  );
};

export default RestaurantInfoHeader;
