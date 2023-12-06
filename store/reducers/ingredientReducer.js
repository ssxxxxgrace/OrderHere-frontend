import * as Action from '../actionTypes';

const initialState = {
    unselectedIngredients: {},
};

const ingredientReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Action.SET_UNSELECTED_INGREDIENT:
            const { dish, ingredient } = payload;
            const updatedIngredients = { ...state.unselectedIngredients };
            if (updatedIngredients[dish]) {
                updatedIngredients[dish] = [...updatedIngredients[dish], ingredient];
            } else {
                updatedIngredients[dish] = [ingredient];
            }
            return {
                ...state,
                unselectedIngredients: updatedIngredients
            };
        default:
            return state;
    }
};

export default ingredientReducer;
