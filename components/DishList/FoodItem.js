import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Divider,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import * as Action from '../../store/actionTypes';

const FoodItem = ({ dishId, dishName, description, price, imageUrl }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const item = cartItems.find((item) => item.dishId === dishId);
  const quantity = item ? item.quantity : 0;

  const handleAddToCart = () => {
    if (quantity === 0) {
      const itemPayload = {
        dishId,
        dishName,
        description,
        price,
        imageUrl,
        quantity: 1,
      };
      dispatch({ type: Action.ADD_TO_CART, payload: itemPayload });
    } else {
      dispatch({ type: Action.INCREASE_ITEM, payload: { dishId } });
    }
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      dispatch({ type: Action.DECREASE_ITEM, payload: { dishId } });
    } else if (quantity === 1) {
      dispatch({ type: Action.REMOVE_FROM_CART, payload: { dishId } });
    }
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  

  return (
    <>
      <Divider sx={{ border: 0, borderColor: 'border.main' }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginY: 1.5,
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '16px',
        }}
      >
        
        

        <Box
          component="img"
          sx={{ width: '180px', height: '180px', flexShrink: 0 }}
          src={imageUrl}
          alt={dishName}
        />
        <Box sx={{ ml: 1, flexShrink: 0, width: '250px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
            {dishName}
          </Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: '600' }}>
            {description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 4,
            border: '1px solid #AD343E',
            borderRadius: '10px',
            width: '110px',
            justifyContent: 'space-between',
            padding: '0 8px',
          }}
        >
          <IconButton
            onClick={decrementQuantity}
            sx={{ color: 'button.main' }}
            disabled={quantity === 0}
          >
            <RemoveIcon />
          </IconButton>
          <ListItemText
            primary={quantity}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
          <IconButton onClick={handleAddToCart} sx={{ color: 'button.main' }}>
            <AddIcon />
          </IconButton>
        </Box>
        <Box sx={{ ml: 2, flexShrink: 0, width: '100px' }}>
          <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
            ${price}
          </Typography>
        </Box>
        <Button
          sx={{
            mr: 5,
            backgroundColor: 'button.main',
            fontSize: '13px',
            width: '230px',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'button.main',
              opacity: 0.6,
              transition: '0.3s',
            },
          }}
          onClick={handleAddToCart}
        >
          ADD TO CART
        </Button>
      </Box>
      
    </>
  );
};

export default FoodItem;
