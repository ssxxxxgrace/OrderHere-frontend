import { combineReducers } from 'redux';
import signReducer from './signReducer';
import cartReducer from './cartReducer';
import restaurantReducer from './restaurantReducer';
import dineInReducer from './dineInReducer';

export default combineReducers({
  sign: signReducer,
  cart: cartReducer,
  restaurant: restaurantReducer,
  dineIn:dineInReducer,
});
