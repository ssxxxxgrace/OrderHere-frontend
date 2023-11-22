import * as Action from '../actionTypes';

const initialState = {
  priceRange: { min: 0, max: 100 },
  filteredDishes: [],
};

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.SET_PRICE_RANGE:
      return {
        ...state,
        priceRange: payload,
      };
    case Action.SET_FILTERED_DISHES:
      return {
        ...state,
        filteredDishes: payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
