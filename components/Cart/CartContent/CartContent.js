import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Address from './components/Address/Address';
import CartItems from './components/CartItems/CartItems';
import CheckList from './components/CheckList/CheckList';
import Note from './components/Note/Note';
import Option from './components/Option/Option';
import PickupTime from './components/PickupTime/PickupTime';
import DineIn from './components/DineIn/DineIn';

const Content = () => {
  const orderType = useSelector((state) => state.cart.orderType);

  return (
    <Box sx={{ display: 'flex', marginTop: 3 }}>
      <Box
        sx={{
          width: '440px',
          mr: '24px',
          border: 1,
          borderRadius: 2,
          borderColor: 'border.main',
        }}
      >
        {' '}
        <CheckList />{' '}
      </Box>
      <Box sx={{ width: '855px', ml: '24px' }}>
        {' '}
        <Option />
        <CartItems />
        {orderType === 'delivery' && (
          <>
            <Address />
            <Note />
          </>
        )}
        {orderType === 'dine in' && (
          <>
            <DineIn />
            <Note />
          </>
        )}
        {orderType === 'pickup' && (
          <>
            <PickupTime />
            <Note />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Content;
