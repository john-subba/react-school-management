import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  ADD_TEACHER_DETAILS_SUCCESS,
  ADD_TEACHER_DETAILS_FAILED,
} from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

const registerUser = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case ADD_TEACHER_DETAILS_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case ADD_TEACHER_DETAILS_FAILED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        payload: null,
      };
    case REGISTER_FAILED:
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        payload: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};

export default registerUser;
