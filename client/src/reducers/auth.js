import { REGISTER_FAILED, REGISTER_SUCCESS } from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case REGISTER_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
