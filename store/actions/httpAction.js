import * as Action from '../actionTypes';
import store, { saveState } from '../store';
import { login, signup } from '../../services/Public';
import getRestaurantById from '../../pages/api/restaurantService';
import { generateHashedPassword } from '../../utils/hash';

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

export const loginOrCreateUser = (session) => {
  return async (dispatch) => {
    if (!session) return;

    const email = session.user.email;
    const name = session.user.name;
    const hashedPassword = generateHashedPassword(name, email);

    signup(name, 'John', 'Doe', hashedPassword, email)
      .then((response) => {
        console.log('Signup Success');
        dispatch(loginSuccess(response.data.token));
      })
      .catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data.includes('duplicate key value')) {
          // If signup fails due to duplicate username, try logging in
          login(email, hashedPassword)
            .then((loginResponse) => {
              dispatch(loginSuccess(loginResponse.data.token));
            })
            .catch((loginError) => {
              dispatch(loginError());
            });
        } 
      })
      .finally(() => saveState(store.getState()));
  };
};


export default loginAction;
