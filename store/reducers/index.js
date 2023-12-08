import { combineReducers } from 'redux';
import signReducer from './signReducer';
import cartReducer from './cartReducer';
import restaurantReducer from './restaurantReducer';
import deliveryReducer from './deliveryReducer';
import filterReducer from './filterReducer';
import historyReducer from './historyReducer';
import ingredientReducer from './ingredientReducer';
import dineInReducer from './dineInReducer';
import pickupReducer from './pickupReducer';

export default combineReducers({
  sign: signReducer,
  cart: cartReducer,
  restaurant: restaurantReducer,
  delivery: deliveryReducer,
  dinein: dineInReducer,
  pickup: pickupReducer,
  filter: filterReducer,
  history: historyReducer,
  ingredient: ingredientReducer,
});
