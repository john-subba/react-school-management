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
  DELETE_TEACHER_DETAILS_FAILED,
  DELETE_TEACHER_DETAILS_SUCCESS,
  GET_CURRENT_USER,
  GET_USER_FAILED,
  EDIT_TEACHER_DETAILS_SUCCESS,
  EDIT_TEACHER_DETAILS_FAILED,
} from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

const user = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
    case EDIT_TEACHER_DETAILS_SUCCESS:
    case ADD_TEACHER_DETAILS_SUCCESS:
    case DELETE_TEACHER_DETAILS_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case GET_CURRENT_USER:
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
    case ADD_TEACHER_DETAILS_FAILED:
    case DELETE_TEACHER_DETAILS_FAILED:
    case EDIT_TEACHER_DETAILS_FAILED:
    case GET_USER_FAILED:
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

export default user;
