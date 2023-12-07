import * as Action from '../actionTypes';
import dayjs from 'dayjs';

const initialState = {
  selectedDate: dayjs().format('YYYY-MM-DD'),
  selectedTime: dayjs().format('HH:mm'),
};

const dineInReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.SET_PICK_UP_DATE:
      return {
        ...state,
        selectedDate: payload,
      };
    case Action.SET_PICK_UP_TIME:
      return {
        ...state,
        selectedTime: payload,
      };
    default:
      return state;
  }
};

export default dineInReducer;
