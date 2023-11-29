import * as Action from '../actionTypes';
import store, { saveState } from '../store';
import { login, loginByOathProvider } from '../../services/Public';
import getRestaurantInfo from '../../services/Restaurant';

const loginSuccess = (token) => ({
  type: Action.LOGIN_SUCCESS,
  payload: token,
});

const loginError = () => ({
  type: Action.LOGIN_ERROR,
});

export const loginAction = (email, password, success, fail) => (dispatch) => {
  login(email, password)
    .then((response) => {
      dispatch(loginSuccess(response.data.token));
      //asdasd
      success(response);
    })
    .catch((error) => {
      dispatch(loginError());
      fail(error);
    })
    .then(() => saveState(store.getState()));
};

export const loginWithOauthProviderAction =
  (provider, openId, email, username, avatarUrl, success, fail) =>
  (dispatch) => {
    loginByOathProvider(provider, openId, email, username, avatarUrl)
      .then((response) => {
        dispatch(loginSuccess(response.data));
        success(response);
      })
      .catch((error) => {
        console.log('login fail');
        dispatch(loginError());
        fail(error);
      })
      .then(() => saveState(store.getState()));
  };

export const fetchRestaurant = (restaurantId) => async (dispatch) => {
  dispatch({ type: Action.FETCH_RESTAURANT_START });

  try {
    const response = await getRestaurantInfo(restaurantId);
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
