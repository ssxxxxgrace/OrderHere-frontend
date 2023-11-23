import { Box, Typography, Divider, ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CheckListItems from './components/CheckListItems/ChecklistItems';
import * as Action from '../../../../../store/actionTypes';
import { placeOrder } from '../../../../../services/orderService';
import { useRouter } from 'next/router';

const CheckList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const totalPrice = useSelector((state) => state.cart.totalPrice).toFixed(2);
  const cartItems = useSelector((state) => state.cart.items);

  const shippingFee = 0;

  const address = useSelector((state) => state.delivery.addressData);
  const note = useSelector((state) => state.delivery.noteData);

  const handleClearCart = () => {
    dispatch({ type: Action.CLEAR_CART });
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  const handleCheckout = async () => {
    router.push('/pay');
    // const orderData = {
    //   userId: 1,
    //   orderType: 'delivery',
    //   orderStatus: 'pending',
    //   discount: 0,
    //   address: address.address,
    //   totalPrice: parseFloat(totalPrice),
    //   note: note.note,
    //   dishes: cartItems.map((item) => ({
    //     dishId: item.dishId,
    //     dishName: item.dishName,
    //     dishQuantity: item.quantity,
    //     dishPrice: item.price,
    //   })),
    // };
    // console.log('Address:', address);
    // console.log('Note:', note);
    // console.log('order data:', orderData);

    // if (!address.name || !address.phone || !address.address) {
    //   console.log('Warning: Shipping information is missing!');
    //   return;
    // }

    // try {
    //   const response = await placeOrder(orderData);
    //   console.log('Order placed successfully:', response);
    //   dispatch({ type: Action.CLEAR_CART });
    //   router.push('/');
    // } catch (error) {
    //   console.error('Error placing order:', error.response);
    // }
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

      {(!address.name || !address.phone || !address.address) && (
        <Box
          sx={{
            mx: 2,
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'warning.main',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
            Warning: Shipping information is missing!
          </Typography>
        </Box>
      )}

      <Box
        sx={{ padding: 2, display: 'flex', justifyContent: 'center', mb: 4 }}
      >
        <ButtonBase
          onClick={handleCheckout}
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
