import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FoodItem from '/components/DishList/FoodItem';
import {
  Box,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Button,
} from '@mui/material';
import { getDishes } from '../../services/Dish';
import AddDishModal from './AddDishModal';
import { useDispatch } from 'react-redux';
import { addDishStart, addDishSuccess, addDishError } from './AddDishModal';
import { postDishes } from '../../services/Dish';

const FoodItemsList = ({ dishes: initialDishes }) => {
  // const [dishes, setDishes] = useState([]);
  // console.log('initial:', initialDishes)
  const [dishes, setDishes] = useState(initialDishes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddDishModalOpen, setAddDishModalOpen] = useState(false);
  const [dishAdditionCount, setDishAdditionCount] = useState(0);

  const dispatch = useDispatch();
  const handleAddNewDishClick = () => {
    setAddDishModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddDishModalOpen(false);
  };

  const priceRange = useSelector((state) => state.filter.priceRange);

  const handleAddDishSubmit = async (newDishData) => {
    dispatch(addDishStart());
    try {
      const response = await postDishes(newDishData);

      if (response) {
        dispatch(addDishSuccess(response.data.data));
        setDishAdditionCount((count) => count + 1);
      }
    } catch (error) {
      dispatch(addDishError(error.toString()));
    }
    handleCloseModal();
  };

  useEffect(() => {
    // setIsLoading(true);
    // getDishes()
    //   .then((response) => {
    //     const filteredDishes = response.data.data.filter(
    //       (dish) =>
    //         dish.price >= priceRange.min && dish.price <= priceRange.max,
    //     );
    //     // setDishes(response.data.data);
    //     setDishes(filteredDishes);
    //     console.log(filteredDishes);
    //     setError(null);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching dishes:', error);
    //     setError('Failed to fetch dishes');
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    const filteredDishes = initialDishes.filter(
      (dish) => dish.price >= priceRange.min && dish.price <= priceRange.max,
    );
    setDishes(filteredDishes);
    setError(null);
  }, [priceRange, dishAdditionCount, initialDishes]);

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
        />
      ))}

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
  );
};

export default FoodItemsList;
