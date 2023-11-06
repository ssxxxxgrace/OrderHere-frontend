// FoodItemsList.js
import React from 'react';
import FoodItem from '/components/DishList/FoodItem';
import { Box, Typography, Divider } from '@mui/material';

const FoodItemsList = () => {
  return (
    <>
      <Divider sx={{ borderColor: 'border.main' }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginY: 1.5,
        }}
        ></Box>
      <FoodItem
        dishName="Pepperoni"     
        extras="Pepperoni, basil, oregano, chili, mozzarella cheese"
        price="20.00"
      />
      <FoodItem
        dishName="Penne Bolognese"     
        extras="Pork and veeal mince slow cooked in a rich Italian red sauce"
        price="15.00"
      />
      <FoodItem
        dishName="Scotch Fillet 250g"
        extras="All steaks come with your choice of chips, salad or steamed veg"
        price="27.00"
      />
      <Divider sx={{ borderColor: 'border.main' }} />
    </>
  );
};

export default FoodItemsList;
