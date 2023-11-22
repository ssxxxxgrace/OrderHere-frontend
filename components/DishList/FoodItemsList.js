import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FoodItem from '/components/DishList/FoodItem';
import { Box, Divider, CircularProgress, Alert, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { getDishes } from '../../services/Dish';
import AddDishModal from './AddDishModal';
import { useDispatch } from 'react-redux';
import { addDishStart, addDishSuccess, addDishError } from './AddDishModal';


const FoodItemsList = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddDishModalOpen, setAddDishModalOpen] = useState(false);

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
      const response = await fetch('/api/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDishData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(addDishSuccess(data));
      setDishes([...dishes, data]);
    } catch (error) {
      dispatch(addDishError(error.toString()));
    }
    handleCloseModal();
  };

  useEffect(() => {
    setIsLoading(true);
    getDishes()
      .then((response) => {
        const filteredDishes = response.data.data.filter(
          (dish) =>
            dish.price >= priceRange.min && dish.price <= priceRange.max,
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

      <IconButton
        onClick={handleAddNewDishClick}
        sx={{
          color: 'button.main',
          marginLeft: 50 
        }}
      >
        <AddIcon />
      </IconButton>

      <AddDishModal
        open={isAddDishModalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleAddDishSubmit}
      />
    </>
  );
};

export default FoodItemsList;
