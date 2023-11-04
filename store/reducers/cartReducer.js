import * as Action from '../actionTypes';

const initialState = {
  items: [],
  isLoading: false,
  totalItems: 0,
  totalPrice: 0,
  orderType: "delivery",
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.ADD_TO_CART:
      return {
        ...state,
        items: [
          ...state.items,
          {
            dishId: payload.dishId,
            quantity: payload.quantity,
            price: payload.price,
          },
        ],
      };

    case Action.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.dishId !== payload.dishId),
      };

    case Action.CLEAR_CART:
      return initialState;

    case Action.CART_OPERATION_START:
      return {
        ...state,
        isLoading: true,
      };

    case Action.CART_OPERATION_END:
      return {
        ...state,
        isLoading: false,
      };

    case Action.INCREASE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.dishId === payload.dishId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case Action.DECREASE_ITEM:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.dishId === payload.dishId && item.quantity > 0
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case Action.CALCULATE_TOTAL_PRICE:
      return {
        ...state,
        totalItems: state.items.reduce(
          (total, item) => total + item.quantity,
          0,
        ),
        totalPrice: state.items.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        ),
      };

    case Action.SET_ORDER_TYPE:
      return {
        ...state,
        orderType: payload,
      };

    default:
      return state;
  }
};

export default cartReducer;