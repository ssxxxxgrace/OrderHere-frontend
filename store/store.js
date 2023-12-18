import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
// import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import signReducer from './reducers/signReducer';
import cartReducer from './reducers/cartReducer';
import restaurantReducer from './reducers/restaurantReducer';
import deliveryReducer from './reducers/deliveryReducer';
import filterReducer from './reducers/filterReducer';
import historyReducer from './reducers/historyReducer';
import ingredientReducer from './reducers/ingredientReducer';
import dineInReducer from './reducers/dineInReducer';
import pickupReducer from './reducers/pickupReducer';

const signPersistConfig = {
  key: 'sign',
  storage,
  whitelist: ['isLogin', 'token']
};


const persistedSignReducer = persistReducer(signPersistConfig, signReducer);

const rootReducer = combineReducers({
  sign: persistedSignReducer,
  cart: cartReducer,
  restaurant: restaurantReducer,
  delivery: deliveryReducer,
  dinein: dineInReducer,
  pickup: pickupReducer,
  filter: filterReducer,
  history: historyReducer,
  ingredient: ingredientReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {}
};

const store = createStore(
  // rootReducer,
  // loadState(),
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const persistor = persistStore(store);

export { store, persistor };
