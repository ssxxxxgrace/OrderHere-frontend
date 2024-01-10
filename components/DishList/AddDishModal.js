import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  TextField,
  FormControl,
  Button,
} from '@mui/material';
import {
  ADD_DISH_START,
  ADD_DISH_SUCCESS,
  ADD_DISH_ERROR,
} from '../../store/actionTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCategoriesByRestaurant } from '../../services/Category';

const AddDishModal = ({ open, handleClose, handleSubmit }) => {
  const [newDish, setNewDish] = useState({
    dishName: '',
    description: '',
    price: '',
    restaurantId: 1,
    availability: true,
    imageFile: null,
    categoryId: 0,
  });

  const [imageName, setImageName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleDeleteFile = () => {
    setImageName('');
    setNewDish({ ...newDish, imageFile: null });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imageFile') {
      setNewDish({ ...newDish, imageFile: files[0] });
      setImageName(files[0].name);
    } else {
      setNewDish({ ...newDish, [name]: value });
    }
  };

  const handleFormSubmit = () => {
    handleSubmit(newDish);
    handleClose();
  };

  const selectCategory = (categoryId) => {
    return parseInt(categoryId);
  };

  useEffect(() => {
    getCategoriesByRestaurant().then((res) => {
      setCategories(res.data);
    });
  }, [open]);

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
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={selectCategory(newDish.categoryId)}
            label="Category"
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
          <Button
            variant="contained"
            component="label"
            style={{ marginRight: 8 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleChange}
              name="imageFile"
            />
          </Button>
          {imageName && (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {imageName}
              <DeleteIcon
                onClick={handleDeleteFile}
                style={{ cursor: 'pointer', marginLeft: 8 }}
              />
            </span>
          )}
        </div>
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
