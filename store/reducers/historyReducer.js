import * as Action from '../actionTypes';

const initialState = {
    active: 'all',
};

const historyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Action.SET_ACTIVE_NAV:
        return {
          ...state,
          active: payload,
        };
      default:
        return state;
    }
  };
  
  export default historyReducer;