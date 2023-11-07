import { combineReducers } from 'redux';
import signReducer from './signReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  sign: signReducer,
  cart: cartReducer,
});
