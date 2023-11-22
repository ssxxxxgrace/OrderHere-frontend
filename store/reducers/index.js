import { combineReducers } from 'redux';
import signReducer from './signReducer';
import cartReducer from './cartReducer';
import restaurantReducer from './restaurantReducer';
import deliveryReducer from './deliveryReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  sign: signReducer,
  cart: cartReducer,
  restaurant: restaurantReducer,
  delivery: deliveryReducer,
  filter: filterReducer,
});
