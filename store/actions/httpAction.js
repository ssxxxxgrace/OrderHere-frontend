import * as Action from '../actionTypes';
import store, { saveState } from '../store';
import { login } from '../../services/Public';

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
      //asdasd
      success(response);
    })
    .catch((error) => {
      dispatch(loginError());
      fail(error);
    })
    .then(() => saveState(store.getState()));
};

export default loginAction;
