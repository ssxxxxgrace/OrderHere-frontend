import * as Action from '../actionTypes';
import store, { saveState } from '../store';

export const openSignDialog = () => ({
  type: Action.OPEN_SIGN_DIALOG,
});

export const closeSignDialog = () => ({
  type: Action.CLOSE_SIGN_DIALOG,
});

export const loginSignDialog = () => ({
  type: Action.LOGIN_SIGN_DIALOG,
});

export const registerSignDialog = () => ({
  type: Action.REGISTER_SIGN_DIALOG,
});

export const logoutAction = () => (dispatch) => {
  dispatch({
    type: Action.LOGOUT,
  });
  saveState(store.getState());
};
