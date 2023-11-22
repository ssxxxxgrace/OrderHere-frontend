import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoodItem from '/components/DishList/FoodItem';
import { Box, Divider, CircularProgress, Alert } from '@mui/material';
import { getDishes } from '../../services/Dish';

const FoodItemsList = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const priceRange = useSelector((state) => state.filter.priceRange);

  useEffect(() => {
    setIsLoading(true);
    getDishes()
      .then((response) => {
        const filteredDishes = response.data.data.filter(
          (dish) => dish.price >= priceRange.min && dish.price <= priceRange.max
        );
        // setDishes(response.data.data);
        setDishes(filteredDishes);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching dishes:', error);
        setError('Failed to fetch dishes');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [priceRange]);

  console.log(dishes);

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
      <Divider sx={{ borderColor: 'border.main' }} />
      {dishes.map((dish) => (
        <FoodItem
          key={dish.dishId}
          dishId={dish.dishId}
          dishName={dish.dishName}
          description={dish.description}
          price={dish.price}
          imageUrl={dish.imageUrl}
        />
      ))}
      <Divider sx={{ borderColor: 'border.main' }} />
    </>
  );
};

export default FoodItemsList;
