import * as Action from '../actionTypes';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case Action.FETCH_RESTAURANT_START:
      return { ...state, loading: true };
    case Action.FETCH_RESTAURANT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case Action.FETCH_RESTAURANT_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
