import CartItem from './components/CartItem/CartItem';
import { Box, Typography, Divider } from '@mui/material';

const CartItems = () => {
  return (
    <>
      <Divider sx={{ borderColor: 'border.main' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1.5 }}>
        <Typography
          sx={{ color: 'black', fontSize: '17px', fontWeight: '700' }}
        >
          IMAGE
        </Typography>
        <Typography
          sx={{ color: 'black', fontSize: '17px', fontWeight: '700', ml: 21 }}
        >
          PRODUCT DETAILS
        </Typography>
        <Typography
          sx={{ color: 'black', fontSize: '17px', fontWeight: '700', ml: 16 }}
        >
          QTY
        </Typography>
        <Typography
          sx={{ color: 'black', fontSize: '17px', fontWeight: '700', ml: 8 }}
        >
          TOTAL
        </Typography>
        <Typography
          sx={{ color: 'black', fontSize: '17px', fontWeight: '700', ml: 12 }}
        >
          CLEAN
        </Typography>
      </Box>
      <CartItem
        dishName="Delicious Cheeseburger"
        dishSize="Medium"
        extras="Chips & Coca-Cola"
        price="35.88"
      />
      <CartItem
        dishName="Delicious Cheeseburger"
        dishSize="Medium"
        extras="Chips & Coca-Cola"
        price="35.88"
      />
      <CartItem
        dishName="Delicious Cheeseburger"
        dishSize="Medium"
        extras="Chips & Coca-Cola"
        price="35.88"
      />
      <Divider sx={{ borderColor: 'border.main' }} />
    </>
  );
};

export default CartItems;
