import * as Action from '../actionTypes';

const initialState = {
  dishes: [],
  isLoading: false,
  error: null,
};

const dishesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.ADD_DISH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case Action.ADD_DISH_SUCCESS:
      return {
        ...state,
        dishes: [...state.dishes, payload],
        isLoading: false,
      };

    case Action.ADD_DISH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default dishesReducer;
