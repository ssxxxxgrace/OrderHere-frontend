import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import {
  Box,
  Typography,
  ListItemText,
  IconButton,
  Button,
  List,
  ListItem,
  Collapse,
  Checkbox,
  TextField,
  DialogTitle,
  Input,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import {
  getIngredientsByDish,
  getIngredient,
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from '../../services/Ingredient';
import styles from './DishPopup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '../../store/actionTypes';
import { updateDishes } from '../../services/Dish';
import { jwtInfo } from '../../utils/jwtInfo';

const DishPopup = ({
  dishId,
  dishName,
  description,
  price,
  imageUrl,
  open,
  onClose,
}) => {
  const [ingredientDetails, setIngredientDetails] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const item = cartItems.find((item) => item.dishId === dishId);
  const quantity = item ? item.quantity : 0;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox' } };
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempIngredientDetails, setTempIngredientDetails] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);
  const [tempUnselectedIngredients, setTempUnselectedIngredients] = useState(
    new Set(),
  );
  const [newDish, setNewDish] = useState({
    dishId: dishId,
    dishName: dishName,
    description: description,
    price: price,
    restaurantId: 1,
    availability: true,
    imageFile: null,
  });
  const router = useRouter();
  const { token } = useSelector((state) => state.sign);
  const { userRole } = jwtInfo(token);
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  // const unselectedIngredients = useSelector((state) => state.ingredient.unselectedIngredients);
  // console.log('unselect', unselectedIngredients)

  // console.log('show dish is:', dishId);
  useEffect(() => {
    getIngredientsByDish(dishId)
      .then((response) => {
        const ingredientPromises = response.data.map((dish) => {
          return getIngredient(dish.ingredientId);
        });
        Promise.all(ingredientPromises)
          .then((ingredientsResponses) => {
            const details = ingredientsResponses.map((ingredientResponse) => ({
              id: ingredientResponse.data.ingredientId,
              name: ingredientResponse.data.name,
            }));
            setIngredientDetails(details);
            setTempIngredientDetails(details);
          })
          .catch((error) =>
            console.error('Fetching ingredient info failed', error),
          );
      })
      .catch((error) => console.error('Fetching dishes failed', error));
  }, [dishId]);

  const handleDishChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setNewDish({ ...newDish, imageFile: files[0] });
    } else {
      setNewDish({ ...newDish, [name]: value });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      dispatch({ type: Action.DECREASE_ITEM, payload: { dishId } });
    } else if (quantity === 1) {
      dispatch({ type: Action.REMOVE_FROM_CART, payload: { dishId } });
      dispatch({
        type: Action.REMOVE_UNSELECTED_INGREDIENTS,
        payload: { dish: dishName },
      });
    }
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    if (quantity === 0) {
      const itemPayload = {
        dishId,
        dishName,
        description,
        price,
        imageUrl,
        quantity: 1,
      };
      dispatch({ type: Action.ADD_TO_CART, payload: itemPayload });
    } else {
      dispatch({ type: Action.INCREASE_ITEM, payload: { dishId } });
    }
    dispatch({ type: Action.CALCULATE_TOTAL_PRICE });

    tempUnselectedIngredients.forEach((ingredient) => {
      dispatch({
        type: Action.SET_UNSELECTED_INGREDIENT,
        payload: {
          dish: dishName,
          ingredient: ingredient,
        },
      });
    });
    setTempUnselectedIngredients(new Set());
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      setTempIngredientDetails([...ingredientDetails]);
    }
    // console.log('Entering edit mode');
    setIsEditMode(!isEditMode);
  };

  const handleIngredientChange = (event, index) => {
    const newName = event.target.value;
    const capitalizedNewName =
      newName.charAt(0).toUpperCase() + newName.slice(1);
    const newDetails = [...tempIngredientDetails];
    newDetails[index] = {
      ...newDetails[index],
      name: capitalizedNewName,
    };
    setTempIngredientDetails(newDetails);
  };

  const saveIngredients = async () => {
    const isAnyEmpty = tempIngredientDetails.some(
      (ingredient) => !ingredient.name.trim(),
    );
    if (isAnyEmpty) {
      alert('Ingredient names cannot be empty.');
      return;
    }
    let updatedIngredients = [...tempIngredientDetails];
    for (let i = 0; i < tempIngredientDetails.length; i++) {
      const ingredient = tempIngredientDetails[i];
      try {
        if (ingredient.isNew) {
          try {
            const response = await createIngredient({
              dishId: dishId,
              name: ingredient.name,
              unit: 'grams',
              quantityValue: 1,
            });
            // console.log('response', response.data);
            updatedIngredients[i] = {
              ...ingredient,
              id: response.data,
              isNew: false,
            };
          } catch (error) {
            console.error('Error creating ingredient:', error.response);
          }
        } else {
          await updateIngredient({
            ingredientId: ingredient.id,
            name: ingredient.name,
          });
        }
      } catch (error) {
        console.error('Error updating ingredient:', error.response);
      }
    }
    setTempIngredientDetails(updatedIngredients);
    setIngredientDetails(updatedIngredients);
    setIsEditMode(false);
  };

  const addNewIngredient = () => {
    const newIngredientDetail = {
      id: Date.now(),
      name: '',
      isNew: true,
    };
    setTempIngredientDetails((prevIngredients) => [
      ...prevIngredients,
      newIngredientDetail,
    ]);
  };

  const deleteIngredientItem = async (dishId, ingredientId) => {
    const ingredientToDelete = tempIngredientDetails.find(
      (ingredient) => ingredient.id === ingredientId,
    );
    if (!ingredientToDelete.name.trim() || ingredientToDelete.isNew) {
      const updatedIngredients = tempIngredientDetails.filter(
        (ingredient) => ingredient.id !== ingredientId,
      );
      setTempIngredientDetails(updatedIngredients);
    } else {
      try {
        const response = await deleteIngredient({
          dishId: dishId,
          ingredientId: ingredientId,
        });
        // console.log('Delete ingredient successfully:', response);
        const updatedIngredients = tempIngredientDetails.filter(
          (ingredient) => ingredient.id !== ingredientId,
        );
        setTempIngredientDetails(updatedIngredients);
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error('Error delete ingredient:', error.response);
      }
    }
  };

  const handleCheckboxChange = (ingredientName, isChecked) => {
    setTempUnselectedIngredients((prev) => {
      const newUnselected = new Set(prev);
      if (isChecked) {
        newUnselected.delete(ingredientName);
      } else {
        newUnselected.add(ingredientName);
      }
      return newUnselected;
    });
  };

  const handleEditDishSubmit = async (newDishData) => {
    try {
      console.log('newDishData', newDishData);
      const response = await updateDishes(newDishData);

      if (response) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error updating dish:', error.response);
    }
    setIsEditMode(false);
  };

  return (
    <Dialog open={open} onClose={onClose} className={styles.dishPopup}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '1rem',
          backgroundColor: '#D3D3D3',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        style={{
          padding: 0,
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
        }}
      >
        {isEditMode && userRole == 'ROLE_sys_admin' ? (
          <Box position="relative" display="inline-block">
            <img width="500px" height="auto" src={imageUrl} alt={dishName} />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                name="imageFile"
                onChange={handleDishChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <InsertPhotoOutlinedIcon
                    style={{ fontSize: 200, color: 'white' }}
                  />
                </IconButton>
              </label>
            </Box>
          </Box>
        ) : (
          <img width="500px" height="auto" src={imageUrl} alt={dishName} />
        )}
        <DialogContentText
          className={styles.dishTitle}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {isEditMode && userRole == 'ROLE_sys_admin' ? (
            <TextField
              fullWidth
              sx={{ mt: 2, mr: 3 }}
              variant="outlined"
              label="Dish Name"
              name="dishName"
              value={newDish.dishName}
              onChange={handleDishChange}
            />
          ) : (
            <Typography variant="h6">{dishName}</Typography>
          )}
          {userRole == 'ROLE_sys_admin' && (
            <IconButton
              onClick={toggleEditMode}
              sx={{
                backgroundColor: 'button.main',
                color: '#f4f4f4',
                marginRight: 3,
                paddingInline: 2,
                fontWeight: 600,
                fontSize: '1.2rem',
                '&:hover': {
                  backgroundColor: '#BF5B5F',
                },
              }}
            >
              Edit
            </IconButton>
          )}
        </DialogContentText>

        <DialogContentText
          className={styles.dishPrice}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {isEditMode && userRole == 'ROLE_sys_admin' ? (
            <TextField
              fullWidth
              sx={{ mt: 2, mr: 3 }}
              variant="outlined"
              label="Price"
              name="price"
              value={newDish.price}
              onChange={handleDishChange}
              type="number"
              inputProps={{ min: 0 }}
            />
          ) : (
            <Typography variant="h6">${price}</Typography>
          )}
        </DialogContentText>

        <DialogContentText className={styles.dishIngredients}>
          {isEditMode && userRole == 'ROLE_sys_admin' ? (
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              multiline
              variant="outlined"
              label="Description"
              name="description"
              value={newDish.description}
              onChange={handleDishChange}
            />
          ) : (
            <Typography>{description}</Typography>
          )}
        </DialogContentText>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginY: 2,
          }}
        >
          {isEditMode && userRole == 'ROLE_sys_admin' && (
            <IconButton
              onClick={() => handleEditDishSubmit(newDish)}
              sx={{
                backgroundColor: 'button.main',
                color: '#f4f4f4',
                marginRight: 3,
                paddingInline: 2,
                fontWeight: 600,
                fontSize: '1.2rem',
                '&:hover': {
                  backgroundColor: '#BF5B5F',
                },
              }}
            >
              Edit Dish
            </IconButton>
          )}
        </Box>

        <DialogContentText sx={{ overflowY: 'auto' }}>
          <Box
            sx={{
              backgroundColor: '#ededed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              pt: 1,
              pb: 1,
            }}
            onClick={toggleCollapse}
          >
            <Typography
              variant="Ingredients"
              sx={{ ml: 4, color: 'black', fontSize: '1.2em', fontWeight: 600 }}
            >
              Ingredients,{' '}
              {isCollapsed ? 'Click to expand.' : 'Un-tick to remove.'}
            </Typography>
            <IconButton>
              {isCollapsed ? <AddIcon /> : <RemoveIcon />}
            </IconButton>
          </Box>
          <Collapse
            in={!isCollapsed}
            sx={{ ml: 2, color: '#666', marginBlock: 1, fontWeight: 400 }}
          >
            <List>
              {tempIngredientDetails.map((ingredient, index) => (
                <ListItem
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    fontSize: 17,
                  }}
                  key={ingredient.id}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {isEditMode && userRole == 'ROLE_sys_admin' ? (
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <TextField
                          label="Ingredient Name"
                          value={ingredient.name}
                          onChange={(e) => handleIngredientChange(e, index)}
                          sx={{ flexGrow: 1 }}
                        />

                        <HighlightOffRoundedIcon
                          onClick={() => {
                            // console.log('Deleting ingredient:', ingredient);
                            if (!ingredient.name.trim() || ingredient.isNew) {
                              deleteIngredientItem(dishId, ingredient.id);
                            } else {
                              setSelectedIngredientId(ingredient.id);
                              setDeleteDialogOpen(true);
                            }
                          }}
                          sx={{
                            flexGrow: 1,
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': { transform: 'rotate(90deg)' },
                          }}
                        />
                        <Dialog
                          open={deleteDialogOpen}
                          keepMounted
                          onClose={() => setDeleteDialogOpen(false)}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogTitle>
                            {'Delete ingredient permanently'}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              If you confirm to delete this ingredient, it will
                              be permanently deleted. Do you want to delete it
                              right now?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setDeleteDialogOpen(false)}>
                              No
                            </Button>
                            <Button
                              onClick={() =>
                                deleteIngredientItem(
                                  dishId,
                                  selectedIngredientId,
                                )
                              }
                            >
                              Yes
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    ) : (
                      <Typography sx={{ flexGrow: 1 }}>
                        {ingredient.name}
                      </Typography>
                    )}
                    <Checkbox
                      {...label}
                      defaultChecked
                      onChange={(e) =>
                        handleCheckboxChange(ingredient.name, e.target.checked)
                      }
                      sx={{
                        color: 'button.main',
                        '&.Mui-checked': {
                          color: 'button.main',
                        },
                      }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
            {isEditMode && userRole == 'ROLE_sys_admin' ? (
              <Box>
                <Box
                  onClick={addNewIngredient}
                  sx={{
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                    marginInline: 2,
                    paddingBlock: 1,
                    mb: 1,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(128, 128, 128, 0.25)',
                    },
                  }}
                >
                  <AddCircleRoundedIcon style={{ fontSize: 40 }} />
                </Box>

                <IconButton
                  onClick={() => saveIngredients()}
                  sx={{
                    backgroundColor: 'button.main',
                    color: '#f4f4f4',
                    width: '95%',
                    fontWeight: 600,
                    paddingBlock: 1.5,
                    display: 'block',
                    marginTop: 1.5,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    '&:hover': {
                      backgroundColor: '#BF5B5F',
                    },
                  }}
                >
                  Save
                </IconButton>
              </Box>
            ) : null}
          </Collapse>
        </DialogContentText>
        <hr style={{ width: '100%' }} />
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '20px',
        }}
      >
        {quantity > 0 && (
          <Box
            sx={{
              mr: 14,
              backgroundColor: 'button.main',
              fontSize: '25px',
              width: '230px',
              height: '50px',
              color: '#fff',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>{price * quantity}</div>
          </Box>
        )}
        {quantity > 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 4,
              border: '1px solid #AD343E',
              borderRadius: '10px',
              width: '200px',
              height: '50px',
              justifyContent: 'space-between',
              padding: '0 8px',
            }}
          >
            <IconButton
              onClick={decrementQuantity}
              sx={{ color: 'button.main' }}
              disabled={quantity === 0}
            >
              <RemoveIcon />
            </IconButton>
            <ListItemText
              primary={quantity}
              primaryTypographyProps={{ fontWeight: 600 }}
              style={{ paddingLeft: '25%' }}
            />
            <IconButton onClick={handleAddToCart} sx={{ color: 'button.main' }}>
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <DialogActions style={{ padding: 0 }}>
            <Button
              sx={{
                mr: 4,
                backgroundColor: 'button.main',
                fontSize: '25px',
                width: '200px',
                height: '50px',
                color: '#fff',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: 'button.main',
                  opacity: 0.6,
                  transition: '0.3s',
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={handleAddToCart}
            >
              <div>Add</div>
            </Button>
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
};

export default DishPopup;
