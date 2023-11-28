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
import DeleteIcon from '@mui/icons-material/Delete';

const AddDishModal = ({ open, handleClose, handleSubmit }) => {
  const [newDish, setNewDish] = useState({
    dishName: '',
    description: '',
    price: '',
    restaurantId: 1,
    availability: true,
    imageFile: null,
  });

  const [imageName, setImageName] = useState("");

  const handleDeleteFile = () => {
    setImageName("");
    setNewDish({ ...newDish, imageFile: null });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile") {
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
