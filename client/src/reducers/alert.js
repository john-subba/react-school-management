import { SET_ALERT } from '../constants/constant';

const initialState = [];

function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    default:
      return state;
  }
}

export default alertReducer;
