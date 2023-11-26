import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import {
  Box,
  Typography,
  Divider,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { getIngredientsByDish } from '../../services/Ingredient';
import { getIngredient } from '../../services/Ingredient';
import styles from './DishPopup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '../../store/actionTypes';
import { width } from '@mui/system';

// 弹窗组件
const DishPopup = ({
  dishId,
  dishName,
  description,
  price,
  imageUrl,
  open,
  onClose,
}) => {
  const [ingredients, setIngredients] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const item = cartItems.find((item) => item.dishId === dishId);
  const quantity = item ? item.quantity : 0;

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        // 首先获取原始 ingredients 数据
        const response = await getIngredientsByDish(dishId);

        // 对于每个 ingredient，使用其 ID 获取完整的详情
        const ingredientDetailsPromises = response.data.map((ingredient) =>
          getIngredient(ingredient.ingredientId),
        );

        // 等待所有的 ingredient 详情请求完成
        const ingredientsDetails = await Promise.all(ingredientDetailsPromises);

        // 将原始 ingredients 数据与获取到的名称合并
        const ingredientsWithNames = response.data.map((ingredient, index) => ({
          ...ingredient,
          name: ingredientsDetails[index].data.name, // 假设每个ingredient的响应中都有一个data对象，它包含了name属性
        }));

        setIngredients(ingredientsWithNames);
      } catch (error) {
        console.error('Error fetching Ingredients: ', error);
      }
    };

    if (dishId) {
      fetchIngredients();
    }
  }, [dishId]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      dispatch({ type: Action.DECREASE_ITEM, payload: { dishId } });
    } else if (quantity === 1) {
      dispatch({ type: Action.REMOVE_FROM_CART, payload: { dishId } });
    }
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

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

  return (
    <Dialog open={open} onClose={onClose} className={styles.dishPopup}>
      <DialogContent style={{ padding: 0 }}>
        <img src={imageUrl} alt={dishName} className={styles.dishImage} />
        <DialogContentText className={styles.dishTitle}>
          {dishName}
        </DialogContentText>
        <DialogContentText className={styles.dishIngredients}>
          {ingredients.map((ingredient) => ingredient.name).join(', ')}
        </DialogContentText>
        <hr style={{ width: '100%' }} />
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 4,
            border: '1px solid #AD343E',
            borderRadius: '10px',
            width: '200px',
            height: '70px',
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
            style={{ paddingLeft: '25%' }}
          />
          <IconButton onClick={handleAddToCart} sx={{ color: 'button.main' }}>
            <AddIcon />
          </IconButton>
        </Box>
        <DialogActions style={{ padding: 0 }}>
          <Button
            sx={{
              mr: 5,
              backgroundColor: 'button.main',
              fontSize: '25px',
              width: '230px',
              height: '70px',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'button.main',
                opacity: 0.6,
                transition: '0.3s',
              },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px',
            }}
            onClick={handleAddToCart}
          >
            <div>ADD</div>
            <div>{price * quantity}</div>
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DishPopup;
