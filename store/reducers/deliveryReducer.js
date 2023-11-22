import * as Action from '../actionTypes';

const initialState = {
    addressData: {}, 
    noteData: '', 
};

const deliveryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Action.SET_ADDRESS_DATA:
            return {
                ...state,
                addressData: payload,
            };

        case Action.SET_NOTE_DATA:
            return {
                ...state,
                noteData: payload,
            };
        default:
            return state;
    }
};

export default deliveryReducer;
