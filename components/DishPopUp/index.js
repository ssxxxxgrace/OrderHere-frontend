import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions } from '@mui/material';
import axios from 'axios';
import DishDetails from './DishDetails';
import QuantityControl from './QuantityControl';

const MenuItemPopup = ({ dishId, open, onClose }) => {
    const [dish, setDish] = useState(null);
    const [quantity, setQuantity] = useState(1);
  
    useEffect(() => {
      const fetchDish = async () => {
        try {
          const response = await axios.get(`YOUR_API_ENDPOINT/dish/${dishId}`);
          setDish(response.data);
        } catch (error) {
          console.error('There was an error fetching the dish!', error);
        }
      };
  
      fetchDish();
    }, [dishId]);
  
    return (
      <Dialog open={open} onClose={onClose}>
        {dish && <DishDetails item={dish} />}
        <QuantityControl quantity={quantity} setQuantity={setQuantity} />
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {/* Add to cart logic here */}} color="primary">
            Add ${dish ? dish.price * quantity : ''}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


export default MenuItemPopup;