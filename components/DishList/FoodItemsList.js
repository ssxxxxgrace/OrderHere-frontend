import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import FoodItem from '/components/DishList/FoodItem';
import { Box, CircularProgress, Alert, Button } from '@mui/material';
import AddDishModal from './AddDishModal';
import { useDispatch } from 'react-redux';
import { addDishStart, addDishSuccess, addDishError } from './AddDishModal';
import { deleteDish, postDishes } from '../../services/Dish';
import { jwtInfo } from '../../utils/jwtInfo';
import * as Action from '../../store/actionTypes';

const FoodItemsList = ({ dishes: initialDishes }) => {
  const [dishes, setDishes] = useState(initialDishes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddDishModalOpen, setAddDishModalOpen] = useState(false);
  const [dishAdditionCount, setDishAdditionCount] = useState(0);
  const { searchTerm, category } = useSelector((state) => state.dish);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleAddNewDishClick = () => {
    setAddDishModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddDishModalOpen(false);
  };

  // const handleRemoveDish = (dishId) => {
  //   dispatch({ type: Action.REMOVE_DISH, payload: dishId });
  //   setDishes(dishes.filter(dish => dish.dishId !== dishId));
  // };

  const handleRemoveDish = async (dishId) => {
    try {
      const response = await deleteDish(dishId);
      if (response.status === 200 || response.status === 204) {   
        setDishes(currentDishes => currentDishes.filter(dish => dish.dishId !== dishId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const priceRange = useSelector((state) => state.filter.priceRange);

  const { token } = useSelector((state) => state.sign);
  const { userRole } = jwtInfo(token);

  const handleAddDishSubmit = async (newDishData) => {
    dispatch(addDishStart());
    try {
      const response = await postDishes(newDishData);

      if (response) {
        dispatch(addDishSuccess(response.data.data));
        setDishAdditionCount((count) => count + 1);
        router.push('/');
      }
    } catch (error) {
      dispatch(addDishError(error.toString()));
    }
    handleCloseModal();
  };

  useEffect(() => {
    let filteredDishes = initialDishes.filter(
      (dish) => dish.price >= priceRange.min && dish.price <= priceRange.max,
    );
    if (searchTerm) {
      filteredDishes = filteredDishes.filter(
        (dish) =>
          dish.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dish.price.toString().includes(searchTerm),
      );
    }
    if (category) {
      filteredDishes = filteredDishes.filter(
        (dish) => dish.categoryId === category,
      );
    }
    setDishes(filteredDishes);
    setError(null);
  }, [priceRange, dishAdditionCount, initialDishes, searchTerm, category]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <Alert severity="error" sx={{ width: '50%', fontSize: '1.2rem' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <>
      {dishes.map((dish) => (
        <FoodItem
          key={dish.dishId}
          dishId={dish.dishId}
          dishName={dish.dishName}
          description={dish.description}
          price={dish.price}
          imageUrl={dish.imageUrl}
          rating={dish.rating}
          onRemoveDish={handleRemoveDish}
        />
      ))}

      {userRole == 'ROLE_sys_admin' && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={handleAddNewDishClick}
              sx={{
                mt: 5,
                mr: 5,
                backgroundColor: 'button.main',
                fontSize: '14px',
                width: '170px',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'button.main',
                  opacity: 0.6,
                  transition: '0.3s',
                },
              }}
            >
              ADD NEW DISH
            </Button>
          </Box>
          <AddDishModal
            open={isAddDishModalOpen}
            handleClose={handleCloseModal}
            handleSubmit={handleAddDishSubmit}
          />
        </>
      )}
    </>
  );
};

export default FoodItemsList;

