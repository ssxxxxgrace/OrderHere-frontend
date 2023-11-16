import {
  Box,
  Typography,
  Divider,
  ListItemText,
  ButtonBase,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '../../../../../../../store/actionTypes';

const CartItem = ({ dishId, dishName, description, price, imageUrl }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const item = cartItems.find((item) => item.dishId === dishId);

  const handleIncreaseQuantity = () => {
    dispatch({ type: Action.INCREASE_ITEM, payload: { dishId } });
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  const handleDecreaseQuantity = () => {
    dispatch({ type: Action.DECREASE_ITEM, payload: { dishId } });
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: Action.REMOVE_FROM_CART, payload: { dishId } });
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

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
          src={imageUrl}
          alt="food"
        />
        <Box sx={{ ml: 5 }}>
          <Typography
            sx={{ fontSize: '17px', fontWeight: '600', width: 250, marginY: 2 }}
          >
            {dishName}
          </Typography>
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: '500',
              width: 250,
              color: 'text.dishDescription',
            }}
          >
            {description}
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
            <ButtonBase
              onClick={handleIncreaseQuantity}
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
            </ButtonBase>
            <ListItemText
              primary={item?.quantity}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
            <ButtonBase
              onClick={handleDecreaseQuantity}
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
            </ButtonBase>
          </Box>
        </Box>
        <Box sx={{ ml: 5 }}>
          <Typography sx={{ fontSize: '16px', fontWeight: '600', width: 100 }}>
            ${price}
          </Typography>
        </Box>
        <Box
          onClick={handleRemoveFromCart}
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
