import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import {
  ADD_DISH_START,
  ADD_DISH_SUCCESS,
  ADD_DISH_ERROR,
} from '../../store/actionTypes';

const AddDishModal = ({ open, handleClose, handleSubmit }) => {
  const [newDish, setNewDish] = useState({
    dishName: '',
    description: '',
    price: '',
    imageUrl: '',
    restaurantId: 1,
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleFormSubmit = () => {
    handleSubmit(newDish);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Dish</DialogTitle>
      <DialogContent>
        <TextField
          name="dishName"
          label="Dish Name"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Price"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="imageUrl"
          label="Image URL"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Add Dish</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDishModal;

export const addDishStart = () => ({
  type: ADD_DISH_START,
});

export const addDishSuccess = (dishData) => ({
  type: ADD_DISH_SUCCESS,
  payload: dishData,
});

export const addDishError = (error) => ({
  type: ADD_DISH_ERROR,
  payload: error,
});
