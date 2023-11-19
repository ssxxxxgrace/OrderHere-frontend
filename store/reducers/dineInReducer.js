import { UPDATE_DINE_IN_DATA } from '../actionTypes';
import dayjs from "dayjs";

const initialState = {
    selectedDate: dayjs().format('YYYY-MM-DD'),
    selectedTime: dayjs().format('HH:mm'),
    name: '',
    phoneNumber: '',
    personCount: 0,
    note: '',
};

const dineInReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DINE_IN_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default dineInReducer;