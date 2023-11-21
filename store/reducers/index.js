import { combineReducers } from 'redux';
import signReducer from './signReducer';
import cartReducer from './cartReducer';
import restaurantReducer from './restaurantReducer';
import dineInReducer from './dineInReducer';
import deliveryReducer from './deliveryReducer';

export default combineReducers({
  sign: signReducer,
  cart: cartReducer,
  restaurant: restaurantReducer,
  dineIn:dineInReducer,
  delivery: deliveryReducer,
});
