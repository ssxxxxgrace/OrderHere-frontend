import { signOut } from 'next-auth/react';
import * as Action from '../actionTypes';
import {saveState, store} from '../store';

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

export const forgetpasswordSignDialog = () => ({
  type: Action.FORGETPASSWORD_SIGN_DIALOG,
});

export const logoutAction = () => (dispatch) => {
  //clear the NextAuth session
  // signOut({ redirect: `http://localhost:3000` });

  dispatch({
    type: Action.LOGOUT,
  });
  saveState(store.getState());
};
