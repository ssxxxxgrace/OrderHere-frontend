import * as Action from '../actionTypes';

const initialState = {
    orders: [],
    options: {
        delivery: true,
        dine_in: true,
        pickup: true,
    },
    status: {
        pending: true,
        preparing: true,
        finished: true,
        in_transit: true,
        delayed: true,
        delivered: true,
        cancelled: true,
    },
    sortedOrder: '',
    searchText: '',
};

const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Action.DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order.orderId !== payload),
            };
        case Action.FETCH_ORDERS:
            return {
                ...state,
                orders: Array.isArray(payload) ? payload : [],
            };
        case Action.SET_ORDER_OPTION:
            return {
                ...state,
                options: payload,
            };
        case Action.SET_ORDER_STATUS:
            return {
                ...state,
                status: payload,
            };
        case Action.SET_SORTED_ORDER:
            return {
                ...state,
                sortedOrder: payload,
            };
        case Action.SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: payload,
            };
        case Action.UPDATE_ORDER_STATUS:
            return {
                ...state,
                orders: state.orders.map(order => {
                    if (order.orderId === payload.orderId) {
                        return { ...order, orderStatus: payload.newStatus };
                    }
                    return order;
                }),
            };
        default:
            return state;
    }
};

export default orderReducer;