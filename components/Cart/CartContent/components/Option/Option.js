import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as Action from '../../../../../store/actionTypes';

const Option = () => {
  const dispatch = useDispatch();
  const orderType = useSelector((state) => state.cart.orderType);

  const handleClick = (newOrderType) => {
    dispatch({ type: Action.SET_ORDER_TYPE, payload: newOrderType });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        sx={{
          backgroundColor: orderType === 'delivery' ? 'button.main' : 'grey',
          width: '120px',
          height: '48px',
          borderRadius: '50px',
          mb: 4,
          '&:hover': {
            backgroundColor: orderType === 'dine in' ? 'button.main' : 'grey',
          },
        }}
        onClick={() => handleClick('delivery')}
      >
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Delivery
        </Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: orderType === 'pickup' ? 'button.main' : 'grey',
          width: '120px',
          height: '48px',
          borderRadius: '50px',
          '&:hover': {
            backgroundColor: orderType === 'dine in' ? 'button.main' : 'grey',
          },
        }}
        onClick={() => handleClick('pickup')}
      >
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Pickup
        </Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: orderType === 'dine in' ? 'button.main' : 'grey',
          width: '120px',
          height: '48px',
          borderRadius: '50px',
          '&:hover': {
            backgroundColor: orderType === 'dine in' ? 'button.main' : 'grey',
          },
        }}
        onClick={() => handleClick('dine in')}
      >
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Dine in
        </Typography>
      </Button>
    </Box>
  );
};

export default Option;
