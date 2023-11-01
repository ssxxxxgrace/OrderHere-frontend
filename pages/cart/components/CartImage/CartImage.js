import { Box } from '@mui/material';
import React from 'react';

const CartImage = () => {
  return (
    <Box sx={{
      width: '1440px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
       <img src="/image/cart-bg.png" alt="Picture" width={'100%'}/>
    </Box>
  );
};

export default CartImage;