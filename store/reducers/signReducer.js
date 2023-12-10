import * as Action from '../actionTypes';

const initialState = {
  isOpen: false,
  content: 'login',
  isLogin: false,
  token: undefined,
};

const signReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.OPEN_SIGN_DIALOG:
      return {
        ...state,
        isOpen: true,
      };

    case Action.CLOSE_SIGN_DIALOG:
      return {
        ...state,
        isOpen: false,
      };

    case Action.LOGIN_SIGN_DIALOG:
      return {
        ...state,
        content: 'login',
      };

    case Action.REGISTER_SIGN_DIALOG:
      return {
        ...state,
        content: 'register',
      };

    case Action.FORGETPASSWORD_SIGN_DIALOG:
      return {
        ...state,
        // isOpen: true,
        content: 'forgetpassword',
      };

    case Action.FORGET_PASSWORD_SUCCESS:
      // Handle state update for a successful password reset request
      return {
        ...state,
        // other state updates
        passwordResetStatus: 'success', // example state field
        message: Action.payload, // the success message from the backend
      };

    case Action.FORGET_PASSWORD_ERROR:
      // Handle state update for a failed password reset request
      return {
        ...state,
        // other state updates
        passwordResetStatus: 'error', // example state field
        error: Action.payload, // the error message
      };

    case Action.LOGIN_SUCCESS:
      return {
        ...state,
        isOpen: false,
        isLogin: true,
        token: payload,
      };

    case Action.LOGIN_ERROR:
      return {
        ...state,
        isLogin: false,
        token: undefined,
      };

    case Action.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default signReducer;
