import * as Action from '../actionTypes';

const initialState = {
    unselectedIngredients: [],
};

const ingredientReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Action.SET_UNSELECTED_INGREDIENT:
            return {
                ...state,
                unselectedIngredients: [...state.unselectedIngredients, payload],
            };
        default:
            return state;
    }
};

export default ingredientReducer;