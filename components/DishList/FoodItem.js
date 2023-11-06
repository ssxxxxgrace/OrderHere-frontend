import React, { useState } from 'react';
import { Box, Typography, Divider, ListItemText, Button } from '@mui/material';

const FoodItem = ({ dishName, extras, description, price, imageSrc, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1); 

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };


  return (
    <>
      <Divider sx={{ border: 0, borderColor: 'border.main' }} />
      <Box
        sx={{
          display: 'center',
          alignItems: 'center',
          marginY: 1.5,
        }}
      >
        <Box
          component="img"
          width="180px"
          height="180px"
          src="/image/Dish1.png"
          alt="food"
        />
        <Box sx={{ ml: 1 }}>
          <Typography sx={{ fontSize: '20px', fontWeight: '600', width: 250 }}>
            {dishName}
          </Typography>
          
          <Typography sx={{ fontSize: '12px', fontWeight: '600', width: 250 }}>
            {extras}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
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
                color: '#AD343E',
                boardercolor: 'red',
                mx: 1,
                ':hover': {
                  cursor: 'pointer',
                  opacity: 0.5,
                },
              }}
            >
              +
            </Typography>
            <ListItemText primary={'1'} />
            <Typography
              sx={{
                fontSize: '24px',
                color: '#AD343E',
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
            width: 200,
            ':hover': {
              cursor: 'pointer',
              opacity: 1.5,
            },
          }}
          src="/image/dish3.png"
          alt="delete"
        />
      </Box>
    </>
  );
};

export default FoodItem;
