import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import * as Action from '../../../../../../../store/actionTypes';

const CheckListItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (dishId) => {
    dispatch({ type: Action.INCREASE_ITEM, payload: { dishId } });
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  const handleDecreaseQuantity = (dishId) => {
    dispatch({ type: Action.DECREASE_ITEM, payload: { dishId } });
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  return (
    <List>
      {cartItems.map((item, index) => (
        <ListItem key={index}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 150 }}>
              <ListItemText
                primary={item.dishName}
                primaryTypographyProps={{
                  sx: { fontSize: '14px', color: '#353535', fontWeight: '450' },
                }}
              />
              <ListItemText
                primary={`$${item.price}`}
                primaryTypographyProps={{
                  sx: { fontSize: '12px', color: '#717171', fontWeight: '450' },
                }}
              />
            </Box>

            <Box
              sx={{
                ml: 18,
                border: 1.3,
                borderColor: 'button.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 75,
              }}
            >
              <Typography
                onClick={() => handleIncreaseQuantity(item.dishId)}
                sx={{
                  color: 'text.dishSize',
                  fontSize: '20px',
                  mx: 1,
                  ':hover': { cursor: 'pointer', opacity: 0.5 },
                }}
              >
                +
              </Typography>
              <ListItemText primary={item.quantity} />
              <Typography
                onClick={() => handleDecreaseQuantity(item.dishId)}
                sx={{
                  color: 'text.dishSize',
                  fontSize: '24px',
                  mx: 1,
                  ':hover': { cursor: 'pointer', opacity: 0.5 },
                }}
                disabled={item.quantity === 0}
              >
                -
              </Typography>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default CheckListItems;
