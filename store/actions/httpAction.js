import * as Action from '../actionTypes';
import store, { saveState } from '../store';
import { login } from '../../services/Public';
import getRestaurantById from '../../pages/api/restaurantService';

const loginSuccess = (token) => ({
  type: Action.LOGIN_SUCCESS,
  payload: token,
});

const loginError = () => ({
  type: Action.LOGIN_ERROR,
});

const loginAction = (email, password, success, fail) => (dispatch) => {
  login(email, password)
    .then((response) => {
      dispatch(loginSuccess(response.data.token));
      success(response);
    })
    .catch((error) => {
      dispatch(loginError());
      fail(error);
    })
    .then(() => saveState(store.getState()));
};

export const fetchRestaurant = (restaurantId) => async (dispatch) => {
  dispatch({ type: Action.FETCH_RESTAURANT_START });

  try {
    const response = await getRestaurantById(restaurantId);
    dispatch({
      type: Action.FETCH_RESTAURANT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: Action.FETCH_RESTAURANT_ERROR,
      payload: error,
    });
  }
};

export default loginAction;
