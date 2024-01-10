import { Box } from '@mui/material';
import React from 'react';

const CartImage = () => {
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
      {/* <img 
        backgroundImage: 'url(/image/cart-bg.png)',
        alt="Picture" 
        style={{ 
          backgroundSize: 'cover',
          maxWidth: '100%',  
          width: '100%',  
          height: '300px'  
        }} 
      /> */}
    </Box>
  );
};

export default CartImage;
