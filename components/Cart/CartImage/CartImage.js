import { Box } from '@mui/material';

const CartImage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="/image/cart-bg.png" alt="Picture" width={'100%'} />
    </Box>
  );
};

export default CartImage;
