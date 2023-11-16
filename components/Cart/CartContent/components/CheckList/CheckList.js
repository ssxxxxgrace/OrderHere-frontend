import { Box, Typography, Divider, ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CheckListItems from './components/CheckListItems/ChecklistItems';
import * as Action from '../../../../../store/actionTypes';

const CheckList = () => {
  const dispatch = useDispatch();

  const totalPrice = useSelector((state) => state.cart.totalPrice).toFixed(2);

  const shippingFee = 0;

  const handleClearCart = () => {
    dispatch({ type: Action.CLEAR_CART });
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  return (
    <>
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '20px', fontWeight: '600', color: 'text.title' }}
        >
          Checklist
        </Typography>
        <ButtonBase
          onClick={handleClearCart}
          sx={{
            ':hover': {
              cursor: 'pointer',
            },
          }}
        >
          <img src="icons/cart/trash.png" alt="trash" />
        </ButtonBase>
      </Box>
      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />
      <Box sx={{ mx: 2, height: 216, overflowY: 'scroll' }}>
        <CheckListItems />
      </Box>
      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />

      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '16px', fontWeight: '400', color: 'text.title' }}
        >
          Total
        </Typography>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '400', color: 'text.title' }}
        >
          ${totalPrice}
        </Typography>
      </Box>

      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '14px', fontWeight: '400', color: 'text.title' }}
        >
          Shipping Fee
        </Typography>
        <Typography
          sx={{ fontSize: '14px', fontWeight: '400', color: 'text.title' }}
        >
          ${shippingFee}
        </Typography>
      </Box>
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '10px', fontWeight: '300', color: 'text.warning' }}
        >
          The shipping cost will be calculated based on your chosen address,
          time, and method of delivery, and will be added to this amount.
        </Typography>
        <Box sx={{ ml: 2 }}>
          <img src="icons/cart/warning-2.png" alt="question" />
        </Box>
      </Box>

      <Divider sx={{ mx: 2, borderColor: 'border.section' }} />
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{ fontSize: '18px', fontWeight: '500', color: 'text.title' }}
        >
          Order Total
        </Typography>
        <Typography
          sx={{ fontSize: '18px', fontWeight: '500', color: 'text.dishSize' }}
        >
          ${totalPrice}
        </Typography>
      </Box>
      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'center', mb: 4 }}
      >
        <ButtonBase
          sx={{ backgroundColor: 'button.main', width: '100%', height: 40 }}
        >
          <Typography sx={{ marginRight: 2, color: 'white' }}>
            Check Out
          </Typography>{' '}
          <img src="/icons/cart/user.png" />
        </ButtonBase>
      </Box>
    </>
  );
};

export default CheckList;
