import React from 'react';
import { Box, Typography, Divider, ListItemText } from '@mui/material';

const CartItem = ({ dishName, dishSize, extras, price }) => {
  return (
    <>
      <Divider sx={{ border: 1.25, borderColor: 'border.main' }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginY: 1.5,
        }}
      >
        <Box
          component="img"
          width="180px"
          height="180px"
          src="/image/FoodPicture.png"
          alt="food"
        />
        <Box sx={{ ml: 5 }}>
          <Typography sx={{ fontSize: '17px', fontWeight: '600', width: 250 }}>
            {dishName}
          </Typography>
          <Typography
            sx={{
              fontSize: '17px',
              fontWeight: '600',
              color: 'text.dishSize',
              width: 250,
            }}
          >
            {dishSize}
          </Typography>
          <Typography sx={{ fontSize: '17px', fontWeight: '600', width: 250 }}>
            {extras}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              width: 70,
              ml: 4,
              border: 1.3,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {' '}
            <Typography
              sx={{
                fontSize: '20px',
                mx: 1,
                ':hover': {
                  cursor: 'pointer',
                  opacity: 0.5,
                },
              }}
            >
              +
            </Typography>
            <ListItemText primary={'2'} />
            <Typography
              sx={{
                fontSize: '24px',
                mx: 0.5,
                ':hover': {
                  cursor: 'pointer',
                  opacity: 0.5,
                },
              }}
            >
              -
            </Typography>
          </Box>
        </Box>
        <Box sx={{ ml: 5 }}>
          <Typography sx={{ fontSize: '16px', fontWeight: '600', width: 100 }}>
            ${price}
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            ml: 7,
            ':hover': {
              cursor: 'pointer',
              opacity: 0.5,
            },
          }}
          src="/icons/cart/close_fill 1.png"
          alt="delete"
        />
      </Box>
    </>
  );
};

export default CartItem;
