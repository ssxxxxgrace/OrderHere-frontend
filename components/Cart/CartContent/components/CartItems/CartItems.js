import CartItem from './components/CartItem/CartItem';
import { Box, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';

const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.items);

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
      {cartItems.map((cartItem) => (
        <React.Fragment key={cartItem.dishId}>
          <CartItem
            dishId={cartItem.dishId}
            dishName={cartItem.dishName}
            description={cartItem.description}
            imageUrl={cartItem.imageUrl}
            price={cartItem.price}
          />
          <Divider sx={{ borderColor: 'border.main' }} />
        </React.Fragment>
      ))}
    </>
  );
};

export default CartItems;
