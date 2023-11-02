import React from 'react';
import { DialogTitle, DialogContent, Typography } from '@mui/material';

const DishDetails = ({ item }) => {
  return (
    <>
      <DialogTitle>{item.name}</DialogTitle>
      <DialogContent>
        <img src={item.image} alt={item.name} style={{ width: '100%' }} />
        <Typography variant="body1">{item.ingredients.join(', ')}</Typography>
      </DialogContent>
    </>
  );
};

export default DishDetails;